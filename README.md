# 🔍 KodlaBak

**KodlaBak** is an AI-powered code mentor application designed to help software learners improve their code quality. It
analyzes user-submitted code using Google Gemini and provides feedback based on **SOLID principles**, **Clean Code
practices**, and **refactoring suggestions**.

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
cd kodla-bak
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

## 📁 Project Structure (with descriptions)

```
kodla-bak/
├── backend/                       # FastAPI backend
│   ├── ai/                        # AI logic for code analysis
│   ├── api/                       # API endpoints
│   ├── auth/                      # Authentication and JWT handling
│   ├── db/                        # Database session and models
│   ├── models/                    # Pydantic data models
│   ├── schemas/                   # Request/response schemas
│   ├── venv/                      # Virtual environment (excluded from version control)
│   ├── app.py                     # FastAPI app entry point
│   └── requirements.txt           # Python dependencies
├── frontend/                      # React frontend
│   ├── public/                    # Static files
│   └── src/
│       ├── components/            # Reusable UI components
│       ├── pages/                 # Page-level React components
│       ├── services/              # API interaction functions
│       ├── utils/                 # Utility/helper functions
│       ├── App.js                 # Main React component
│       ├── index.js               # React entry point
│       └── ...                   # Other config/test/style files
├── .env                           # Environment variables
├── .env.example                   # Example env file
├── kodlabak.db                    # SQLite DB (development only)
├── package.json                   # Frontend dependencies
├── tailwind.config.js             # TailwindCSS config
└── README.md                      # Project documentation
```
