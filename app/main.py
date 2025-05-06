from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, analyze
from app.db.database import Base, engine
from app.models.user import User
from app.models.analysis import Analysis
app = FastAPI(
    title="KodlaBak",
    description="Yazılım öğrencileri için yapay zekâ destekli kod analiz ve mentorluk platformu",
    version="0.1.0"
)

print("Veritabanı tabloları oluşturuluyor...")
Base.metadata.create_all(bind=engine)

print(Base.metadata.tables.keys())

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(analyze.router, prefix="/analyze", tags=["Code Analysis"])

@app.get("/")
def root():
    return {"message": "KodlaBak API is working 🚀"}
