# MyApp (Decoupled Monolith)

## Structure
- server/ (Node.js + Express + PostgreSQL + Sequelize)
- client/ (Vite + React + Tailwind + TanStack Query)

## Run (dev)
### Terminal A
cd server
npm run dev

### Terminal B
cd client
npm run dev

Client: http://localhost:5173  
Server: http://localhost:5000  
Health: http://localhost:5000/api/health
