from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.review import ReviewCreate, ReviewResponse
from app.services.review_service import ReviewService
from app.schemas.review import ReviewUpdate


router = APIRouter(
    prefix="/reviews",
)


@router.post(
    "/",
    response_model=ReviewResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
):
    new_review, error = ReviewService.create_review(
        db,
        review,
    )

    if error == "PRODUCT_NOT_FOUND":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    if error == "USER_NOT_FOUND":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if error == "REVIEW_EXISTS":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User has already reviewed this product",
        )

    return new_review

from app.schemas.review import (
    ReviewCreate,
    ReviewResponse,
    ReviewUpdate,
)
@router.put(
    "/{review_id}",
    response_model=ReviewResponse,
)
def update_review(
    review_id: int,
    review_data: ReviewUpdate,
    db: Session = Depends(get_db),
):
    review = ReviewService.get_review(
        db,
        review_id,
    )

    if review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found",
        )

    updated_review = ReviewService.update_review(
        db,
        review,
        review_data,
    )

    return updated_review

@router.delete(
    "/{review_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
):
    review = ReviewService.get_review(
        db,
        review_id,
    )

    if review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found",
        )

    ReviewService.delete_review(
        db,
        review,
    )