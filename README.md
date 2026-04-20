# FixIt

FixIt is a full-stack phone repair booking application built with a React frontend and an Express/PostgreSQL backend. Users can browse supported devices, view available repair services, and submit repair appointments through a guided two-step booking flow.

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Radix UI primitives
- Sonner

### Backend
- Node.js
- Express 5
- Sequelize
- PostgreSQL
- Umzug for migrations
- JWT + bcrypt for authentication

## Features

- Landing page focused on phone repair services for iPhone, Samsung Galaxy, and Google Pixel devices
- Device directory with search and drill-down into repair options
- Repair service listings with pricing, duration, and device-specific availability
- Two-step public booking flow with client-side validation and booking summary
- Catalog API for brand, model, and repair-option data
- Booking availability endpoint for checking reserved time slots by date
- Auth endpoints for user registration, login, and protected profile lookup
- Conflict prevention for appointment creation, including slot locking in the public booking flow
- Lightweight in-memory rate limiting on catalog and booking endpoints
- PostgreSQL migrations and seed scripts for local development data

## Run Locally

### 1. Install dependencies

```bash
cd server
npm install
```

```bash
cd client
npm install
```

### 2. Configure environment variables

Create a `.env` file in `server/` and add the required database and app settings.

### 3. Start the backend

```bash
cd server
npm run dev
```

The API runs on `http://localhost:5000` by default.

In development, the server automatically runs pending migrations on startup.

### 4. Seed local data

```bash
cd server
npm run db:seed
```

This seeds sample devices, repair services, and the FixIt catalog used by the booking flow.

### 5. Start the frontend

```bash
cd client
npm run dev
```

The client runs on `http://localhost:5173` by default.

## Environment Variables

### Server

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Recommended | Full PostgreSQL connection string |
| `DB_HOST` | If not using `DATABASE_URL` | PostgreSQL host |
| `DB_PORT` | No | PostgreSQL port, defaults to `5432` |
| `DB_NAME` | If not using `DATABASE_URL` | PostgreSQL database name |
| `DB_USER` | If not using `DATABASE_URL` | PostgreSQL username |
| `DB_PASSWORD` | If not using `DATABASE_URL` | PostgreSQL password |
| `DB_SSL` | No | Set to `true` to enable SSL for the database connection |
| `PORT` | No | API port, defaults to `5000` |
| `CLIENT_ORIGIN` | No | Comma-separated list of allowed frontend origins for CORS |
| `JWT_SECRET` | Required for auth routes | Secret used to sign and verify JWTs |

### Client

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_API_URL` | No | Base URL for the API, defaults to `http://localhost:5000` |

## API / Architecture Overview

This repository is structured as a decoupled monolith:

- `client/` contains the React single-page app
- `server/` contains the REST API, Sequelize models, migrations, and seed scripts

Core API routes:

- `GET /api/health` checks API and database connectivity
- `GET /api/devices` returns repairable devices
- `GET /api/repairs` and `GET /api/repairs/:id` return repair services
- `GET /api/catalog` returns the branded FixIt catalog used by the booking flow
- `GET /api/bookings` lists bookings
- `GET /api/bookings/availability` returns booked time slots for a given date
- `POST /api/bookings` creates either a public FixIt booking or an authenticated booking, depending on payload shape
- `POST /api/auth/register`, `POST /api/auth/login`, and `GET /api/me` handle authentication

Data model highlights:

- `Devices` -> `RepairServices` -> `Bookings`
- `Brands` -> `Models` -> `RepairOptions`
- `FixItBookings` stores public appointment submissions from the two-step booking flow
