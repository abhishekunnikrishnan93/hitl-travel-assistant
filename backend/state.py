from typing import Dict, Any

# Simple in-memory storage for MVP
# Format: session_id -> {
#   "input": {"destination": "", "dates": "", "budget": ""},
#   "planner": "",
#   "budget": "",
#   "hotel": "",
#   "transport": "",
#   "guide": ""
# }
sessions: Dict[str, Dict[str, Any]] = {}

def get_session(session_id: str) -> Dict[str, Any]:
    if session_id not in sessions:
        sessions[session_id] = {
            "input": {"destination": "", "dates": "", "budget": ""},
            "planner": "",
            "budget": "",
            "hotel": "",
            "transport": "",
            "guide": ""
        }
    return sessions[session_id]

def update_session(session_id: str, key: str, value: Any):
    session = get_session(session_id)
    session[key] = value
    return session
