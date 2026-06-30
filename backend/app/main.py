from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import router
from app.core.config import settings

app = FastAPI(
    title="Review Platform API",
    description="""
A REST API for managing products and reviews.

Features:
- Browse products
- View product details
- Create reviews
- Update reviews
- Delete reviews
""",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "Review Platform API is running"
    }