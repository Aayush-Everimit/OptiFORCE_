from pydantic import BaseModel
from typing import List

class Candidate(BaseModel):
    Candidate_ID: str
    Internal: bool
    Cost_Per_Hour: float
    Availability_Hours: float
    PCR: float
    Fault_Risk_Factor: float
    Skill_A_Backend: float
    Skill_B_Cloud: float

class OptimizationRequest(BaseModel):
    candidates: List[Candidate]
    required_hours: float = 100
    required_skill_a: float = 20
    required_skill_b: float = 25
    max_fault_risk: float = 0.30
    min_internal: int = 3
    cost_unit: float = 20

class OptimizationResponse(BaseModel):
    optimal_team: List[str]
    optimized_cost: float
    traditional_cost_proxy: float
    projected_savings: float
    total_skill_a: float
    total_skill_b: float
    internal_staff_used: int
    action: str
