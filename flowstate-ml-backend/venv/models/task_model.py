import joblib
from pathlib import Path
import random

MODEL_PATH = Path("models/priority_model.joblib")

if MODEL_PATH.exists():
    model, vectorizer = joblib.load(MODEL_PATH)
else:
    model = None
    vectorizer = None

def predict_priority(description: str):
    if model and vectorizer:
        X = vectorizer.transform([description])
        return model.predict(X)[0]
    else:
        # fallback rule-based
        desc = description.lower()
        if any(word in desc for word in ["bug", "crash", "fix", "error", "urgent"]):
            return "High"
        elif any(word in desc for word in ["feature", "update", "enhance"]):
            return "Medium"
        else:
            return "Low"

def suggest_task(context: str):
    ideas = [
        "Add missing unit tests",
        "Refactor existing code for performance",
        "Improve documentation clarity",
        "Review code for potential bugs",
        "Implement dark mode for UI"
    ]
    return random.choice(ideas)
