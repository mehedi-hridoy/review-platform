from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.product_service import ProductService
from app.schemas.product import ProductListResponse

router = APIRouter(
    prefix="/products",
)


@router.get(
    "/",
    response_model=list[ProductListResponse],
)
def get_products(
    db: Session = Depends(get_db),
):
    products = ProductService.get_all_products(db)

    result = []

    for product, average_rating, review_count in products:
        result.append(
    ProductListResponse(
        id=product.id,
        title=product.title,
        description=product.description,
        image_url=product.image_url,
        created_at=product.created_at,
        average_rating=round(
            average_rating or 0,
            1,
        ),
        review_count=review_count,
    )
)

    return result