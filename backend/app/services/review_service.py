from sqlalchemy.orm import Session

from app.models.review import Review
from app.schemas.review import ReviewCreate, ReviewUpdate


class ReviewService:

    @staticmethod
    def create_review(db: Session, review_data: ReviewCreate):

        review = Review(**review_data.model_dump())

        db.add(review)
        db.commit()
        db.refresh(review)

        return review

    @staticmethod
    def get_review(db: Session, review_id: int):

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

        update_data = review_data.model_dump()

        for key, value in update_data.items():
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