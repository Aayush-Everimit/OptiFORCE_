from fastapi import FastAPI
from models import OptimizationRequest, OptimizationResponse
from optimizer import run_optimization

app = FastAPI(
    title="OptiForce Optimization API",
    description="Staffing optimization engine using PuLP",
    version="1.0.0"
)

@app.post("/optimize", response_model=OptimizationResponse)
def optimize_staffing(request: OptimizationRequest):
    result = run_optimization(request)
    return OptimizationResponse(**result)
