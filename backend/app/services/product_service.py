from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.product import Product
from app.models.review import Review
from sqlalchemy import select

from app.schemas.product import ProductCreate
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
    @staticmethod
    def create_product(
        db: Session,
        product: ProductCreate,
    ):
        db_product = Product(
            title=product.title,
            description=product.description,
            image_url=product.image_url,
        )

        db.add(db_product)

        db.commit()

        db.refresh(db_product)

        return db_product

    @staticmethod
    def delete_product(
        db: Session,
        product_id: int,
    ):
        product = (
            db.query(Product)
            .filter(Product.id == product_id)
            .first()
        )

        if not product:
            return None

        db.delete(product)

        db.commit()

        return product

@staticmethod
def delete_product(
    db: Session,
    product_id: int,
):
    statement = select(Product).where(
        Product.id == product_id
    )

    product = db.scalar(statement)

    if not product:
        return None

    db.delete(product)

    db.commit()

    return product