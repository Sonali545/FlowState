from utils.db_utils import connect_db, init_db
import datetime

init_db()
with connect_db() as conn:
    conn.execute("INSERT INTO users (name, email, role, avatar, xp, created_at) VALUES (?, ?, ?, ?, ?, ?)",
                 ("Sonali Kamble", "sonali@example.com", "Admin", "default.png", 1500, datetime.datetime.utcnow().isoformat()))
    conn.execute("INSERT INTO projects (name, description, created_at) VALUES (?, ?, ?)",
                 ("FlowState AI Docs", "An AI-powered documentation and project management tool.", datetime.datetime.utcnow().isoformat()))
    conn.commit()
print("✅ Database seeded with dummy data.")
