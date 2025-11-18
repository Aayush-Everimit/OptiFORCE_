from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.security.api_key import APIKeyHeader, APIKey
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
import os
from dotenv import load_dotenv

# --- CONFIGURATION & MODEL LOADING ---

# Load environment variables for security
load_dotenv()
API_KEY_NAME = "X-API-Key"
API_KEY = os.getenv("OPTI_API_KEY", "default-secret-key") # Use environment variable
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=True)

# Global variables for models and app
app = FastAPI(title="OptiForce AI Engine 1")
reg_model = None
clf_model = None


class TaskMetrics(BaseModel):
    time_logged_hours: float
    output_volume: int
    quality_score_avg: float
    idle_time_pct: float
    past_p_score_trend: float
    mandatory_work_hours: float = 160.0 # Default value
    estimated_task_time_avg: float = 10.0 # Default value

# --- Security Dependency ---
async def get_api_key(api_key_header: str = Security(api_key_header)):
    if api_key_header == API_KEY:
        return api_key_header
    raise HTTPException(status_code=403, detail="Could not validate credentials")


@app.on_event("startup")
def load_models():
    global reg_model
    global clf_model
    try:
        reg_model = joblib.load('reg_model.pkl')
        clf_model = joblib.load('clf_model.pkl')
        print("Models loaded successfully.")
    except FileNotFoundError:
        print("ERROR: Model files not found. Ensure reg_model.pkl and clf_model.pkl are present.")
        # In a production setting, you would raise an exception here

# --- CORE PREDICTION LOGIC ---
def process_analysis(data: TaskMetrics, model_reg, model_clf):
    # 1. Prepare Input Data based on the Pydantic model
    input_df = pd.DataFrame([data.dict()])
    
    # 2. Feature Engineering (Calculating Overtime)
    input_df['overtime'] = (input_df['time_logged_hours'] - input_df['mandatory_work_hours']).clip(lower=0)
    
    
    X = input_df.drop(columns=['mandatory_work_hours', 'estimated_task_time_avg']) 

    # 3. Predict Productivity Score (Regression)
    p_score = model_reg.predict(X)[0]
    
    # 4. Predict Burnout Risk (Classification)
    burnout_prob = model_clf.predict_proba(X)[0][1] # Probability of Class 1 (Risk)
    
    # 5. Format Output
    risk_status = "🔥 HIGH RISK" if burnout_prob > 0.5 else "✅ LOW RISK"
    
    return {
        "Productivity_Score": round(p_score, 1),
        "Burnout_Risk_Status": risk_status,
        "Burnout_Probability": round(burnout_prob * 100, 1)
    }

# --- API ENDPOINT ---
@app.post("/analyze/employee-risk", tags=["Analysis"])
def analyze_employee_risk(
    metrics: TaskMetrics, 
    api_key: APIKey = Depends(get_api_key) # Requires API Key for access
):
    if not reg_model or not clf_model:
        raise HTTPException(status_code=503, detail="AI Models are not ready. Please check server logs.")
        
    results = process_analysis(metrics, reg_model, clf_model)
    return results
