from sqlalchemy.orm import Session

from app.models.user import User


class UserService:

    @staticmethod
    def get_all_users(db: Session):
        return db.query(User).all()
