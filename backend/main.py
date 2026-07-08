import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import google.generativeai as genai
from config import settings
from routes import dashboard

app = FastAPI(title="StadiumGPT API")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix="/api")

# Load Stadium Data safely with absolute path
stadium_data = {}
stadium_path = os.path.join(settings.DATA_DIR, "stadium.json")
try:
    with open(stadium_path, "r", encoding='utf-8') as f:
        stadium_data = json.load(f)
except Exception as e:
    print(f"Warning: Failed to load stadium data from {stadium_path}: {e}")

# Configure Gemini
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

    # Auto-detect supported model to prevent 404 errors
    selected_model = None
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                if 'flash' in m.name:
                    selected_model = m.name
                    break

        # If no flash model found, pick the first supported one
        if not selected_model:
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    selected_model = m.name
                    break
    except Exception as e:
        print(f"Failed to list models: {e}")

    if not selected_model:
        selected_model = 'gemini-pro'  # Safe fallback

    print(f"Connected to Gemini! Using model: {selected_model}")
    model: Optional[genai.GenerativeModel] = (
        genai.GenerativeModel(selected_model)
    )
else:
    model = None
    print("Warning: GEMINI_API_KEY not set. Using local fallback mode.")


class ChatRequest(BaseModel):
    message: str


def fallback_search(query: str) -> str:
    query = query.lower()

    if "gate" in query:
        return (
            "Gates A, B, and C are open. Gate A is the main entrance "
            "(North). Gate C is closest to parking."
        )
    elif "food" in query or "eat" in query:
        return (
            "There are food courts on Level 1 (North Wing) and Level 2 "
            "(South Wing). They serve Burgers, Pizza, and Tacos!"
        )
    elif "restroom" in query or "toilet" in query or "washroom" in query:
        return (
            "Restrooms are located on Level 1 near Gates A and B, "
            "and Level 2 near the South Food Court."
        )
    elif "medical" in query or "help" in query or "emergency" in query:
        return (
            "Medical rooms are near Gate A (Level 1) and Gate C (Level 2). "
            "For emergencies, contact the Security Office at +1-800-STADIUM."
        )
    elif "kannada" in query:
        return (
            "ನಮಸ್ಕಾರ! (Namaskara) - I can only do basic local translations "
            "right now. Please connect the Gemini API for full translation."
        )
    elif "hindi" in query:
        return (
            "नमस्ते! (Namaste) - I can only do basic local translations right "
            "now. Please connect the Gemini API for full translation."
        )

    return (
        "I am operating in offline mode. I can help you find gates, restrooms,"
        " food courts, and medical rooms. What are you looking for?"
    )


@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    if not req.message:
        raise HTTPException(status_code=400, detail="Message is required")

    if model:
        # Construct prompt with context
        context = (
            "You are a helpful AI Stadium Assistant for the FIFA World Cup "
            "2026. Keep answers short, friendly, and helpful. Use the "
            f"following stadium data to answer: {json.dumps(stadium_data)}. "
            f"The user says: {req.message}"
        )
        try:
            response = model.generate_content(context)
            return {"reply": response.text}
        except Exception as e:
            error_msg = str(e)
            print(f"Gemini API Error: {error_msg}")
            fallback_msg = fallback_search(req.message)
            return {
                "reply": (
                    f"AI Error ({error_msg}). "
                    f"Local fallback: {fallback_msg}"
                )
            }
    else:
        # Local Fallback
        reply = fallback_search(req.message)
        return {"reply": reply}


@app.get("/api/stadium")
async def get_stadium_data():
    if not stadium_data:
        raise HTTPException(
            status_code=404, detail="Stadium data not available"
        )
    return stadium_data


@app.get("/")
def read_root():
    return {"message": "StadiumGPT Backend is running."}
