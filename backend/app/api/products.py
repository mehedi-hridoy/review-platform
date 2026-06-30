from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import status
from app.schemas.product import ProductCreate, ProductResponse


from app.database.session import get_db
from app.schemas.product import (
    ProductDetailResponse,
    ProductListResponse,
    ReviewDetailResponse,
)
from app.services.product_service import ProductService

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
                average_rating=round(average_rating or 0, 1),
                review_count=review_count,
            )
        )

    return result


@router.get(
    "/{product_id}",
    response_model=ProductDetailResponse,
)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = ProductService.get_product_by_id(
        db,
        product_id,
    )

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    reviews = []
    total_rating = 0

    for review in product.reviews:
        total_rating += review.rating

        reviews.append(
            ReviewDetailResponse(
                user=review.user.name,
                rating=review.rating,
                comment=review.comment,
            )
        )

    average_rating = (
        round(total_rating / len(reviews), 1)
        if reviews
        else 0
    )

    return ProductDetailResponse(
        id=product.id,
        title=product.title,
        description=product.description,
        image_url=product.image_url,
        created_at=product.created_at,
        average_rating=average_rating,
        review_count=len(reviews),
        reviews=reviews,
    )

@router.post(
    "/",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
):
    return ProductService.create_product(
        db,
        product,
    )

@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    deleted = ProductService.delete_product(
        db,
        product_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )