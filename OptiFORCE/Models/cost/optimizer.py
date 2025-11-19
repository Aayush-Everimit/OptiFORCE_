from pulp import LpProblem, LpMinimize, LpVariable, lpSum, value
import pandas as pd

def run_optimization(request):
    df = pd.DataFrame([c.dict() for c in request.candidates])

    model = LpProblem("OptiForce_Staffing", LpMinimize)

    candidates = df["Candidate_ID"].tolist()
    X = LpVariable.dicts("Assign", candidates, 0, 1, cat="Binary")

    COST_UNIT = request.cost_unit

    # Objective
    Total_Cost = lpSum([
        X[i] * df.loc[df.Candidate_ID == i, "Cost_Per_Hour"].item() * COST_UNIT
        for i in candidates
    ])
    model += Total_Cost

    # Constraints
    model += lpSum([
        X[i] * df.loc[df.Candidate_ID == i, "Availability_Hours"].item()
        for i in candidates
    ]) >= request.required_hours

    model += lpSum([
        X[i] * df.loc[df.Candidate_ID == i, "Skill_A_Backend"].item()
        for i in candidates
    ]) >= request.required_skill_a

    model += lpSum([
        X[i] * df.loc[df.Candidate_ID == i, "Skill_B_Cloud"].item()
        for i in candidates
    ]) >= request.required_skill_b

    # Fault risk filter
    for _, row in df.iterrows():
        if row["Fault_Risk_Factor"] > request.max_fault_risk:
            model += X[row["Candidate_ID"]] == 0

    internal = df[df.Internal == True]["Candidate_ID"].tolist()
    model += lpSum([X[i] for i in internal]) >= request.min_internal

    # Solve
    model.solve()

    # Extract results
    optimal_ids = []
    total_skill_a = 0
    total_skill_b = 0
    internal_count = 0
    optimized_cost = value(Total_Cost)

    for i in candidates:
        if value(X[i]) == 1:
            row = df[df.Candidate_ID == i].iloc[0]
            optimal_ids.append(i)
            total_skill_a += row.Skill_A_Backend
            total_skill_b += row.Skill_B_Cloud
            if row.Internal:
                internal_count += 1

    baseline_rate = df["Cost_Per_Hour"].max()
    traditional_cost = request.required_hours * baseline_rate * 1.2

    saving = traditional_cost - optimized_cost

    # Determine action
    if len(optimal_ids) < 5:
        action = "Recruit"
    elif internal_count < request.min_internal:
        action = "Retrain"
    else:
        action = "Reassign"

    return {
        "optimal_team": optimal_ids,
        "optimized_cost": optimized_cost,
        "traditional_cost_proxy": traditional_cost,
        "projected_savings": saving,
        "total_skill_a": total_skill_a,
        "total_skill_b": total_skill_b,
        "internal_staff_used": internal_count,
        "action": action
    }
