from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.product import Product
from app.models.review import Review


class ProductService:

    @staticmethod
    def get_all_products(db: Session):
        return (
            db.query(
                Product,
                func.avg(Review.rating).label("average_rating"),
                func.count(Review.id).label("review_count"),
            )
            .outerjoin(Review)
            .group_by(Product.id)
            .all()
        )

    @staticmethod
    def get_product_by_id(db: Session, product_id: int):
        return (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )