from flask import Flask, jsonify, request
from flask_cors import CORS
from utils.db_utils import connect_db, init_db
from models.summarizer_model import summarize_text
from models.sentiment_model import detect_sentiment
from models.task_model import predict_priority, suggest_task
import datetime

app = Flask(__name__)
CORS(app)
init_db()

def now_iso():
    return datetime.datetime.utcnow().isoformat() + "Z"

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "ai": True, "db": "sqlite"})

@app.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    desc = data.get("description", "")
    priority = predict_priority(desc)
    suggestion = suggest_task(desc)
    with connect_db() as conn:
        conn.execute(
            "INSERT INTO tasks (board_id, title, description, assignee, labels, priority, suggestion, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (data.get("board_id"), data.get("title"), desc, data.get("assignee",""), data.get("labels",""),
             priority, suggestion, data.get("status","To Do"), now_iso())
        )
        conn.commit()
    return jsonify({"priority": priority, "suggestion": suggestion})

@app.route("/api/ai/summarize", methods=["POST"])
def ai_summarize():
    text = request.get_json().get("text", "")
    return jsonify({"summary": summarize_text(text)})

@app.route("/api/ai/sentiment", methods=["POST"])
def ai_sentiment():
    text = request.get_json().get("text", "")
    return jsonify({"sentiment": detect_sentiment(text)})

@app.route("/api/ai/suggest", methods=["POST"])
def ai_suggest():
    text = request.get_json().get("text", "")
    return jsonify({"suggestion": suggest_task(text)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
