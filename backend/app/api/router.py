from fastapi import APIRouter

from app.api.products import router as product_router
from app.api.reviews import router as review_router

router = APIRouter(prefix="/api")

router.include_router(
    product_router,
    tags=["Products"],
)

router.include_router(
    review_router,
    tags=["Reviews"],
)