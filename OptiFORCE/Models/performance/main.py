import os
import pickle
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel

# ------------------------------------------------------
# INITIAL SETUP
# ------------------------------------------------------

app = FastAPI()

# Get base directory of this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Paths for model and CSV
MODEL_PATH = os.path.join(BASE_DIR, "employee_performance_model.pkl")
CSV_PATH = os.path.join(BASE_DIR, "employee_performance.csv")

# Load dataset for IDs
df = pd.read_csv(CSV_PATH)
ids = df["EmployeeID"]

# Load model
with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

# Keep feature matrix for ID-based prediction
X = df[[
    "Age",
    "ExperienceYears",
    "ProjectsCompleted",
    "AvgProjectRating",
    "AttendanceRate",
    "OvertimeHours",
    "PromotionLast3Yrs"
]]


# ------------------------------------------------------
# REQUEST BODY FOR FEATURE-BASED PREDICTION
# ------------------------------------------------------

class EmployeeFeatures(BaseModel):
    Age: float
    ExperienceYears: float
    ProjectsCompleted: float
    AvgProjectRating: float
    AttendanceRate: float
    OvertimeHours: float
    PromotionLast3Yrs: int


# ------------------------------------------------------
# API ENDPOINTS
# ------------------------------------------------------

@app.get("/")
def home():
    return {"status": "API is running"}


# 1. Predict by Employee ID (uses existing dataset)
@app.get("/predict/id/{emp_id}")
def predict_by_id(emp_id: int):
    if emp_id not in ids.values:
        return {"error": "Employee ID not found"}

    # Get the row index of this ID
    idx = df.index[df["EmployeeID"] == emp_id][0]

    # Extract feature values for this employee
    features = X.loc[idx].values.reshape(1, -1)

    # Predict
    pred = model.predict(features)[0]

    return {
        "EmployeeID": emp_id,
        "PredictedPerformanceScore": float(pred)
    }


# 2. Predict using raw feature input (POST request)
@app.post("/predict/features")
def predict_from_features(data: EmployeeFeatures):
    input_data = [[
        data.Age,
        data.ExperienceYears,
        data.ProjectsCompleted,
        data.AvgProjectRating,
        data.AttendanceRate,
        data.OvertimeHours,
        data.PromotionLast3Yrs
    ]]

    pred = model.predict(input_data)[0]

    return {"PredictedPerformanceScore": float(pred)}
