# 🔍 KodlaBak

**KodlaBak** is an AI-powered code mentor application designed to help software learners improve their code quality. It analyzes user-submitted code using Google Gemini and provides feedback based on **SOLID principles**, **Clean Code practices**, and **refactoring suggestions**.

---

## 🚀 Features

- ✅ User authentication (JWT-based)
- 🤖 AI-based code analysis using Gemini Pro
- 📝 Markdown-rendered feedback
- 🌈 Syntax-highlighted code suggestions (collapsible)
- 🗂️ History of past analyses organized by AI-generated titles
- 💻 Built with React (frontend) and FastAPI (backend)

---

## 🛠️ Installation

### 1. Backend

```bash
git clone https://github.com/yourusername/kodlabak.git
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Create a .env file:

```bash
DATABASE_URL=sqlite:///./kodlabak.db
SECRET_KEY=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
```

#### Run the backend:

```bash
uvicorn backend.app:app --reload
```

### 1. Frontend


```bash
cd frontend
npm install
npm start
```

🧠 How AI Code Analysis Works
1. The user writes code and selects the programming language.

2. The backend sends the code to Gemini Pro with a custom prompt.

3. AI returns a response structured in sections:

- What the code does

- Issues based on SOLID and Clean Code

- mprovement suggestions

- Code block (shown only when requested)

```
kodla-bak/
├── backend/
│   ├── ai/                     # AI service layer (e.g., Gemini integration)
│   │   └── gemini_service.py
│   ├── api/                    # FastAPI route handlers
│   │   ├── analyze.py
│   │   └── auth.py
│   ├── auth/                   # Auth logic (JWT, password hashing, etc.)
│   │   ├── auth.py
│   │   ├── hashing.py
│   │   └── token.py
│   ├── db/                     # Database configuration
│   │   └── database.py
│   ├── models/                 # SQLAlchemy ORM models
│   │   ├── analysis.py
│   │   └── user.py
│   ├── schemas/                # Pydantic schemas for request/response
│   │   ├── analyze_schema.py
│   │   └── user_schema.py
│   └── app.py                  # Main FastAPI app entry point
│
├── frontend/
│   ├── public/                 # Static files for React
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src/                    # React source code
│   │   ├── pages/              # Page-level React components
│   │   │   ├── Home.js
│   │   │   ├── History.js
│   │   │   └── LoginRegister.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── App.css
│   │   ├── index.css
│   │   └── ...
│   ├── tailwind.config.js      # TailwindCSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── package.json
│   └── README.md               # Frontend README
│
├── .env                        # Environment variables
├── requirements.txt            # Python backend dependencies
├── kodlabak.db                 # SQLite database file
└── README.md                   # Project overview (this file)

```