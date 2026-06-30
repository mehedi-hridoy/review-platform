from sqlalchemy.orm import Session

from app.models.product import Product
from app.models.review import Review
from app.models.user import User
from app.schemas.review import ReviewCreate, ReviewUpdate


class ReviewService:

    @staticmethod
    def create_review(
        db: Session,
        review_data: ReviewCreate,
    ):

        product = (
            db.query(Product)
            .filter(Product.id == review_data.product_id)
            .first()
        )

        if product is None:
            return None, "PRODUCT_NOT_FOUND"

        user = (
            db.query(User)
            .filter(User.id == review_data.user_id)
            .first()
        )

        if user is None:
            return None, "USER_NOT_FOUND"

        existing_review = (
            db.query(Review)
            .filter(
                Review.product_id == review_data.product_id,
                Review.user_id == review_data.user_id,
            )
            .first()
        )

        if existing_review:
            return None, "REVIEW_EXISTS"

        review = Review(**review_data.model_dump())

        db.add(review)
        db.commit()
        db.refresh(review)

        return review, None

    @staticmethod
    def get_review(
        db: Session,
        review_id: int,
    ):
        return (
            db.query(Review)
            .filter(Review.id == review_id)
            .first()
        )

    @staticmethod
    def update_review(
        db: Session,
        review: Review,
        review_data: ReviewUpdate,
    ):

        for key, value in review_data.model_dump().items():
            setattr(review, key, value)

        db.commit()
        db.refresh(review)

        return review

    @staticmethod
    def delete_review(
        db: Session,
        review: Review,
    ):
        db.delete(review)
        db.commit()