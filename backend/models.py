from pydantic import BaseModel
from typing import Optional

class InitPlanRequest(BaseModel):
    destination: str
    dates: str
    budget: str
    session_id: str = "default"

class AgentStepRequest(BaseModel):
    session_id: str = "default"
    feedback: Optional[str] = None
    previous_content: Optional[str] = None

class AgentStepUpdate(BaseModel):
    session_id: str = "default"
    content: str
