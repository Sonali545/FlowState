# 🌊 FlowState  
*A fully integrated AI-powered workspace for productivity & collaboration.*

## 📖 Overview  
**FlowState** is a full-stack, AI-enhanced productivity platform that combines real-time collaboration, task management, and intelligent assistance into one seamless experience.  
It helps users create projects, organize workflows, collaborate live, and use AI tools (summarization, sentiment analysis, and task prediction) to boost efficiency.

🧠 Designed as a final-year project, it showcases **React + TypeScript** for the front-end, and a **Python-based ML backend**, representing a powerful intersection of web development and artificial intelligence.

---

## ✨ Features  
- 🧩 **Real-Time Collaboration** – work together seamlessly across devices  
- 📋 **Kanban Board** – organize projects, drag & drop tasks  
- 💬 **Chat & Notes Editor** – write, edit, and collaborate live  
- 🤖 **AI Integrations** – summarizer, sentiment analyzer, and task predictor  
- 🎨 **Theme Customization** – switch between themes and layouts  
- 🔔 **Notifications Panel** – stay updated with real-time alerts  
- 🧭 **Global Search** – instantly find tasks, notes, and projects  
- 📊 **Admin Panel** – manage users, projects, and analytics  
- 📱 **Responsive UI** – optimized for desktop and mobile

---

## 🔗 Live Demo  
🌐 **Try it live:**  
👉 [https://flow-state-sigma.vercel.app/](https://flow-state-sigma.vercel.app/)

Explore:
- Project dashboards  
- Kanban board interactions  
- AI-driven task tools  
- Theme switcher and global search  

---

## 🧰 Tech Stack  
| Layer | Technologies |
|-------|---------------|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS |
| **Backend** | Python (Flask/FastAPI) |
| **AI Models** | Sentiment Analysis, Summarization, Task Prediction |
| **Database** | PostgreSQL / SQLite |
| **Deployment** | Vercel (Frontend), Render/AWS/Heroku (Backend) |
| **Version Control** | Git & GitHub |

---

## 🧩 Getting Started  

### 🧱 Prerequisites  
Make sure you have these installed:  
- Node.js (v16 or above)  
- npm or yarn  
- Python 3.8+  
- Git  

---

### ⚙️ Installation  

#### 🧱 Frontend Setup
```bash
npm install
```
### 🧩 Backend Setup
```bash
cd flowstate-ml-backend
python -m venv venv
venv\Scripts\activate      # On Windows
# or
source venv/bin/activate   # On Mac/Linux
pip install -r requirements.txt
```

🏗 Architecture & Folder Structure

FlowState/
├── components/              # Reusable UI components (Dashboard, Editor, Chat, etc.)
├── hooks/                   # Custom React hooks
├── services/                # API integrations and backend communication
├── utils/                   # Helper functions
├── flowstate-ml-backend/    # Python ML backend
│   ├── app.py
│   ├── models/
│   ├── utils/
│   └── data/
├── package.json
├── tsconfig.json
└── README.md

FlowState is a next-generation workspace merging design, code, and intelligence.
Whether you’re a developer, student, or team lead, this platform is built to help you enter the ultimate flow state and stay productive 🚀
