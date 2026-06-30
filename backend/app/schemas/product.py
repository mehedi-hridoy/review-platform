from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProductBase(BaseModel):
    title: str
    description: str
    image_url: str | None = None


class ProductCreate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ProductListResponse(ProductResponse):
    average_rating: float
    review_count: int


class ReviewDetailResponse(BaseModel):
    user: str
    rating: int
    comment: str


class ProductDetailResponse(ProductResponse):
    average_rating: float
    review_count: int
    reviews: list[ReviewDetailResponse]