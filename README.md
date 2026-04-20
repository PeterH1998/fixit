# FixIt

FixIt is a full-stack phone repair booking application that allows users to browse devices, view repair services, and schedule appointments through a guided two-step booking flow.

Built with a React frontend and a Node.js (Express) + PostgreSQL backend.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS
- Radix UI
- Sonner

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- Umzug (migrations)
- JWT & bcrypt (authentication)

---

## ✨ Features

- Browse supported devices (iPhone, Samsung, Google Pixel)
- Searchable device catalog with drill-down into repair options
- View repair services with pricing, duration, and availability
- Two-step booking flow with validation and summary
- Real-time availability checks to prevent booking conflicts
- Secure authentication (register/login + protected profile)
- REST API for catalog, bookings, and user management
- Rate limiting on booking and catalog endpoints
- Database migrations and seed scripts for local setup

---

## ⚙️ Run Locally

### 1. Install dependencies
cd server  
npm install  

cd ../client  
npm install  

### 2. Configure environment variables
Create a `.env` file in `server/` and add your database and app settings.

### 3. Start the backend
cd server  
npm run dev  

API runs on: http://localhost:5000  
Migrations run automatically on startup in development.

### 4. Seed local data
cd server  
npm run db:seed  

Seeds sample devices, repair services, and catalog data.

### 5. Start the frontend
cd client  
npm run dev  

Client runs on: http://localhost:5173

---

## 🔐 Environment Variables

### Server

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Recommended | Full PostgreSQL connection string |
| DB_HOST | If not using DATABASE_URL | Database host |
| DB_PORT | No | Default: 5432 |
| DB_NAME | If not using DATABASE_URL | Database name |
| DB_USER | If not using DATABASE_URL | Database user |
| DB_PASSWORD | If not using DATABASE_URL | Database password |
| DB_SSL | No | Enable SSL |
| PORT | No | API port (default: 5000) |
| CLIENT_ORIGIN | No | Allowed frontend origins |
| JWT_SECRET | Required for auth | JWT signing secret |

### Client

| Variable | Required | Description |
|----------|----------|-------------|
| VITE_API_URL | No | API base URL (default: http://localhost:5000) |

---

## 🏗️ Architecture

This project follows a decoupled client-server architecture:

- `client/` – React SPA (frontend)
- `server/` – Express API, database models, migrations, and seed scripts

### Core API Routes

- GET /api/health – API and DB health check  
- GET /api/devices – List supported devices  
- GET /api/repairs – List repair services  
- GET /api/catalog – Full repair catalog  
- GET /api/bookings/availability – Check time slot availability  
- POST /api/bookings – Create booking  
- POST /api/auth/register / login – Authentication  
- GET /api/me – Current user  

---

## 📊 Data Model

- Devices → RepairServices → Bookings  
- Brands → Models → RepairOptions  
- FixItBookings → stores public booking flow submissions
