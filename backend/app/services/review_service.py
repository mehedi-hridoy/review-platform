from sqlalchemy.orm import Session

from app.models.review import Review


class ReviewService:

    @staticmethod
    def create_review(db: Session, review: Review):
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
    def update_review(db: Session):
        db.commit()

    @staticmethod
    def delete_review(db: Session, review: Review):
        db.delete(review)
        db.commit()