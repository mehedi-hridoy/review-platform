from app.database.session import SessionLocal

from app.models.user import User
from app.models.product import Product
from app.models.review import Review


def seed():

    db = SessionLocal()

    try:

        if db.query(User).count() > 0:
            print("Database already seeded.")
            return

        john = User(
            name="John Doe",
            email="john@example.com",
        )

        alice = User(
            name="Alice Smith",
            email="alice@example.com",
        )

        bob = User(
            name="Bob Johnson",
            email="bob@example.com",
        )

        db.add_all(
            [
                john,
                alice,
                bob,
            ]
        )

        db.commit()

        db.refresh(john)
        db.refresh(alice)
        db.refresh(bob)

        macbook = Product(
            title="MacBook Pro",
            description="Powerful laptop for developers.",
            image_url="https://placehold.co/600x400/png?text=MacBook+Pro",
        )

        keyboard = Product(
            title="Mechanical Keyboard",
            description="RGB Mechanical Keyboard",
            image_url="https://placehold.co/600x400/png?text=Keyboard",
        )

        monitor = Product(
            title="4K Monitor",
            description="27 inch IPS Display",
            image_url="https://placehold.co/600x400/png?text=Monitor",
        )

        mouse = Product(
            title="Gaming Mouse",
            description="High precision gaming mouse",
            image_url="https://placehold.co/600x400/png?text=Mouse",
        )

        headphones = Product(
            title="Noise Cancelling Headphones",
            description="Premium wireless headphones",
            image_url="https://placehold.co/600x400/png?text=Headphones",
        )

        db.add_all(
            [
                macbook,
                keyboard,
                monitor,
                mouse,
                headphones,
            ]
        )

        db.commit()

        db.refresh(macbook)
        db.refresh(keyboard)
        db.refresh(monitor)
        db.refresh(mouse)
        db.refresh(headphones)

        db.add_all(
            [
                Review(
                    product_id=macbook.id,
                    user_id=john.id,
                    rating=5,
                    comment="Amazing laptop!",
                ),
                Review(
                    product_id=macbook.id,
                    user_id=alice.id,
                    rating=4,
                    comment="Really good.",
                ),
                Review(
                    product_id=keyboard.id,
                    user_id=bob.id,
                    rating=5,
                    comment="Excellent keyboard.",
                ),
                Review(
                    product_id=monitor.id,
                    user_id=john.id,
                    rating=4,
                    comment="Great colors.",
                ),
                Review(
                    product_id=headphones.id,
                    user_id=alice.id,
                    rating=5,
                    comment="Fantastic sound.",
                ),
            ]
        )

        db.commit()

        print("Database seeded successfully!")

    finally:
        db.close()


if __name__ == "__main__":
    seed()