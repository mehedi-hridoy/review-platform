from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ReviewBase(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    comment: str


class ReviewCreate(ReviewBase):
    product_id: int
    user_id: int


class ReviewUpdate(ReviewBase):
    pass


class ReviewResponse(ReviewBase):
    id: int
    product_id: int
    user_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)