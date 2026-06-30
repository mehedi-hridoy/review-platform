from fastapi import FastAPI

from app.api.router import router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "Review Platform API is running"
    }