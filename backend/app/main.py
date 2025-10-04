from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app import health
from app.database import engine, Base
from app.auth.routes import router as auth_router
from app.predict.routes import router as predict_router
from app.logs.routes import router as logs_router

app = FastAPI(redirect_slashes=False)

# Initialize database
Base.metadata.create_all(bind=engine)

# Allowed CORS origins
origins = [
    "https://recyclo-ai.vercel.app",
    "https://recyclo-jiweis-projects.vercel.app",
    "https://recyclo-git-main-jiweis-projects.vercel.app",
    "https://recyclo-dqi89bb81-jiweis-projects.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler that ensures CORS headers are present even on errors"""
    origin = request.headers.get("origin")
    headers = {}

    # Add CORS headers if origin is in allowed list
    if origin in origins:
        headers = {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Credentials": "true",
        }

    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
        headers=headers,
    )

# Routers
app.include_router(health.router)
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(predict_router, tags=["predict"])
app.include_router(logs_router, prefix="/logs", tags=["logs"])
