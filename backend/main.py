from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import io

from models import InitPlanRequest, AgentStepRequest, AgentStepUpdate
import state
import agents
import pdf_generator

load_dotenv(override=True)

app = FastAPI(title="Travel Agent API")

# Setup CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/start")
def start_session(req: InitPlanRequest):
    state.update_session(req.session_id, "input", {
        "destination": req.destination,
        "dates": req.dates,
        "budget": req.budget
    })
    return {"status": "started", "session_id": req.session_id}

@app.post("/planner")
def planner_endpoint(req: AgentStepRequest):
    sess = state.get_session(req.session_id)
    inputs = sess.get("input", {})
    if not inputs.get("destination"):
        raise HTTPException(status_code=400, detail="Session not started properly.")
    
    content = agents.run_planner_agent(
        inputs["destination"], 
        inputs["dates"], 
        inputs["budget"], 
        feedback=req.feedback, 
        previous_content=req.previous_content
    )
    return {"step": "planner", "content": content}

@app.post("/planner/save")
def planner_save(req: AgentStepUpdate):
    state.update_session(req.session_id, "planner", req.content)
    return {"status": "saved"}

@app.post("/budget")
def budget_endpoint(req: AgentStepRequest):
    sess = state.get_session(req.session_id)
    inputs = sess.get("input", {})
    planner_content = sess.get("planner", "")
    content = agents.run_budget_agent(
        inputs.get("destination", ""), 
        inputs.get("budget", ""), 
        planner_content,
        feedback=req.feedback,
        previous_content=req.previous_content
    )
    return {"step": "budget", "content": content}

@app.post("/budget/save")
def budget_save(req: AgentStepUpdate):
    state.update_session(req.session_id, "budget", req.content)
    return {"status": "saved"}

@app.post("/hotel")
def hotel_endpoint(req: AgentStepRequest):
    sess = state.get_session(req.session_id)
    inputs = sess.get("input", {})
    budget_content = sess.get("budget", "")
    content = agents.run_hotel_agent(
        inputs.get("destination", ""), 
        budget_content,
        feedback=req.feedback,
        previous_content=req.previous_content
    )
    return {"step": "hotel", "content": content}

@app.post("/hotel/save")
def hotel_save(req: AgentStepUpdate):
    state.update_session(req.session_id, "hotel", req.content)
    return {"status": "saved"}

@app.post("/transport")
def transport_endpoint(req: AgentStepRequest):
    sess = state.get_session(req.session_id)
    inputs = sess.get("input", {})
    planner_content = sess.get("planner", "")
    content = agents.run_transport_agent(
        inputs.get("destination", ""), 
        planner_content,
        feedback=req.feedback,
        previous_content=req.previous_content
    )
    return {"step": "transport", "content": content}

@app.post("/transport/save")
def transport_save(req: AgentStepUpdate):
    state.update_session(req.session_id, "transport", req.content)
    return {"status": "saved"}

@app.post("/guide")
def guide_endpoint(req: AgentStepRequest):
    sess = state.get_session(req.session_id)
    inputs = sess.get("input", {})
    planner_content = sess.get("planner", "")
    content = agents.run_guide_agent(
        inputs.get("destination", ""), 
        planner_content,
        feedback=req.feedback,
        previous_content=req.previous_content
    )
    return {"step": "guide", "content": content}

@app.post("/guide/save")
def guide_save(req: AgentStepUpdate):
    state.update_session(req.session_id, "guide", req.content)
    return {"status": "saved"}

@app.get("/final/{session_id}")
def generate_final(session_id: str):
    sess = state.get_session(session_id)
    pdf_bytes = pdf_generator.generate_pdf_bytes(sess)
    return StreamingResponse(
        io.BytesIO(pdf_bytes), 
        media_type="application/pdf", 
        headers={"Content-Disposition": f"attachment; filename=Travel_Plan_{session_id}.pdf"}
    )
