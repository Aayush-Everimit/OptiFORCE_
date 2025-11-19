import os
import pickle
import pandas as pd
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split

# ------------------------------------------------------
# SAFE FILE PATH HANDLING
# ------------------------------------------------------
# Get the directory where model.py is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Build the full path to the CSV file inside the same folder
CSV_PATH = os.path.join(BASE_DIR, "employee_performance.csv")

# ------------------------------------------------------
# LOAD DATA
# ------------------------------------------------------
df = pd.read_csv(CSV_PATH)

# Extract IDs
ids = df["EmployeeID"]

# Features
X = df[[
    "Age",
    "ExperienceYears",
    "ProjectsCompleted",
    "AvgProjectRating",
    "AttendanceRate",
    "OvertimeHours",
    "PromotionLast3Yrs"
]]

# Target
y = df["PerformanceScore"]

# Train–test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# ------------------------------------------------------
# MODEL TRAINING
# ------------------------------------------------------
bst = XGBRegressor()
bst.fit(X_train, y_train)

# ------------------------------------------------------
# SAVE MODEL USING PICKLE
# ------------------------------------------------------
MODEL_PATH = os.path.join(BASE_DIR, "employee_performance_model.pkl")

with open(MODEL_PATH, "wb") as f:
    pickle.dump(bst, f)

# ------------------------------------------------------
# PREDICTIONS + RESULTS
# ------------------------------------------------------
preds = bst.predict(X_test)

results = pd.DataFrame({
    "ID": ids.loc[X_test.index].values,
    "y_true": y_test.values,
    "y_pred": preds
})

# ------------------------------------------------------
# PREDICT BY ID FUNCTION
# ------------------------------------------------------
def predict_by_ids(id):
    row = results[results["ID"] == id]
    if row.empty:
        return None
    return row["y_pred"].values[0]

# Example usage
print(predict_by_ids(1064))
