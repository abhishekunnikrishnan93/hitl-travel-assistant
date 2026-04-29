# 🧳 AI Travel Assistant (Human-in-the-Loop)

An end-to-end **agentic AI travel planning system** that allows users to generate travel plans step-by-step and **approve, reject, or modify** each stage before proceeding.

Built with:

* **Frontend:** React (Vite)
* **Backend:** FastAPI
* **LLM:** OpenRouter (via LangChain)
* **Architecture:** Human-in-the-Loop (HITL) agent workflow

---

# 🚀 Features

* ✈️ Multi-agent workflow:

  * Planner → Budget → Hotel → Transport → Guide
* 👤 Human-in-the-loop control (Approve / Reject / Modify)
* 🔁 Iterative refinement using user feedback
* 📄 Final travel plan export as PDF
* ⚡ FastAPI backend with modular agent design
* 🎨 Clean frontend UI for workflow interaction

---

# 📁 Project Structure

```
travel-agent/
├── backend/
│   ├── main.py
│   ├── agents.py
│   ├── models.py
│   ├── state.py
│   ├── pdf_generator.py
│   ├── requirements.txt
│   └── .env              # (not pushed)
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# ⚙️ Backend Setup (FastAPI + venv)

### 1️⃣ Navigate to backend

```
cd backend
```

### 2️⃣ Create virtual environment

```
python -m venv venv
```

### 3️⃣ Activate virtual environment

#### Windows:

```
venv\Scripts\activate
```

#### Mac/Linux:

```
source venv/bin/activate
```

---

### 4️⃣ Install dependencies

```
pip install -r requirements.txt
```

---

### 5️⃣ Create `.env` file

Inside `backend/`:

```
OPENROUTER_API_KEY=your_api_key_here
```

---

### 6️⃣ Run backend server

```
uvicorn main:app --reload
```

👉 Backend runs at:

```
http://127.0.0.1:8000
```

👉 Swagger docs:

```
http://127.0.0.1:8000/docs
```

---

# 🌐 Frontend Setup (Vite + React)

### 1️⃣ Navigate to frontend

```
cd frontend
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Run frontend

```
npm run dev
```

👉 Frontend runs at:

```
http://localhost:5173
```

---

# 🔄 Workflow Overview

1. User enters travel details
2. Planner agent generates itinerary
3. User:

   * ✅ Approves → next agent
   * ❌ Rejects → regenerate
   * ✏️ Modifies → refine output
4. Flow continues through:

   * Budget → Hotel → Transport → Guide
5. Final plan → downloadable PDF

---

# 🔐 Environment Variables

| Variable           | Description            |
| ------------------ | ---------------------- |
| OPENROUTER_API_KEY | API key for LLM access |

---

# 🧠 Tech Stack

* FastAPI
* React (Vite)
* LangChain
* OpenRouter API
* Python
* Tailwind CSS

---

# 🚀 Deployment (Overview)

* **Frontend:** Vercel
* **Backend:** Render / Railway

Set environment variables in deployment platform:

```
OPENROUTER_API_KEY=your_key
```

---

# 📌 Notes

* `.env`, `venv`, `node_modules` are excluded via `.gitignore`
* Ensure backend is running before frontend interaction
* Uses OpenRouter with `base_url` configuration

---

# 🎯 Future Improvements

* Streaming responses (real-time UI)
* Model switching per agent
* Persistent session storage (DB)
* Multi-user authentication

---

# 👨‍💻 Author

Developed as a full-stack AI project integrating agentic workflows with human decision loops.

---
