from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# Do not import app.models here; importing the models from inside Base causes a
# circular dependency when other modules import Base during app startup.
# Alembic will import app.models explicitly in its env.py for autogeneration.
