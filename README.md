# ReviewDibo — Product Review Platform

A full-stack review platform built with **Next.js** (frontend) and **FastAPI** (backend), backed by **PostgreSQL**.

## Live Demo & Submission Links

- GitHub Repository: https://github.com/mehedi-hridoy/review-platform
- Live Frontend: https://zoological-harmony-production-d5aa.up.railway.app/
- Live Backend API: https://review-platform-production.up.railway.app/
- Swagger / API Docs: https://review-platform-production.up.railway.app/docs

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | Next.js 16, React 19, TypeScript  |
| Styling  | Tailwind CSS 4                    |
| Backend  | FastAPI, Python, SQLAlchemy ORM   |
| Database | PostgreSQL                        |
| Migrations | Alembic                         |

## Features

- Browse products with ratings and review counts
- View product details with full review list
- Submit reviews with interactive star rating picker
- Search products by name
- Admin panel: add and delete products
- Responsive dark-themed UI
- Proper loading skeletons and error/empty states
- Additional API endpoint: `GET /api/users`
- Admin page for product management at `/admin`

## Project Structure

```
ReviewDibo/
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI route handlers
│   │   ├── core/         # Settings & configuration
│   │   ├── database/     # SQLAlchemy engine & session
│   │   ├── models/       # ORM models (User, Product, Review)
│   │   ├── schemas/      # Pydantic request/response schemas
│   │   ├── services/     # Business logic layer
│   │   ├── main.py       # FastAPI app entry point
│   │   └── seed.py       # Database seeder script
│   ├── alembic/          # Database migrations
│   ├── alembic.ini
│   └── requirements.txt
├── frontend/
│   ├── app/              # Next.js pages (Home, Product Detail, Admin)
│   ├── components/       # React components
│   ├── lib/              # API client (axios)
│   └── types/            # TypeScript interfaces
└── .env.example          # Environment configuration template
```

## Setup Instructions

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ReviewDibo
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp ../.env.example .env
# Edit .env with your PostgreSQL credentials

# Run database migrations
alembic upgrade head

# Seed the database (optional — adds sample data)
python -m app.seed

# Start the backend server
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.  
Swagger docs: `http://localhost:8000/docs`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## API Endpoints

### Products

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/api/products`       | List all products with ratings |
| GET    | `/api/products/{id}`  | Get product detail + reviews   |
| POST   | `/api/products`       | Create a new product           |
| DELETE | `/api/products/{id}`  | Delete a product               |

### Reviews

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| POST   | `/api/reviews`        | Create a review      |
| PUT    | `/api/reviews/{id}`   | Update a review      |
| DELETE | `/api/reviews/{id}`   | Delete a review      |

### Users

| Method | Endpoint       | Description     |
|--------|----------------|-----------------|
| GET    | `/api/users`   | List all users  |

## Database Schema

```
users
├── id (PK)
├── name
├── email (unique)
└── created_at

products
├── id (PK)
├── title
├── description
├── image_url (nullable)
└── created_at

reviews
├── id (PK)
├── product_id (FK → products.id, CASCADE)
├── user_id (FK → users.id, CASCADE)
├── rating (1-5)
├── comment
├── created_at
└── UNIQUE(user_id, product_id)
```

## Environment Variables

See [`.env.example`](.env.example) for all required environment variables.

| Variable              | Location           | Description                     |
|-----------------------|--------------------|---------------------------------|
| `DATABASE_URL`        | `backend/.env`     | PostgreSQL connection string    |
| `PROJECT_NAME`        | `backend/.env`     | API project name                |
| `NEXT_PUBLIC_API_URL` | `frontend/.env.local` | Backend API base URL         |
