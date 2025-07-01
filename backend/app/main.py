from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import health
from app.database import engine, Base
from app.users.routes import router as users_router
from app.auth.routes import router as auth_router
from app.predict.routes import router as predict_router
from app.logs.routes import router as logs_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://recyclo-ai.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(health.router)
app.include_router(users_router, prefix="/users", tags=["users"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(predict_router, tags=["predict"])
app.include_router(logs_router, tags=["logs"])