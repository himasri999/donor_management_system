# Quick Setup Guide

## Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- Angular CLI (`npm install -g @angular/cli`)

## Database Setup
1. Create database: `createdb donor_management`
2. Run migration: `psql -d donor_management -f database/migrations/init.sql`

## Backend Setup
```bash
cd backend
npm install
npm run dev
```

## Frontend Setup
```bash
cd frontend
npm install
ng serve
```

## Default Login
- Email: admin@example.com
- Password: admin123

## API Endpoints
- POST /api/auth/login
- GET /api/donors
- POST /api/donors
- PUT /api/donors/:id
- DELETE /api/donors/:id
- GET /api/donations
- POST /api/donations
- PUT /api/donations/:id
- DELETE /api/donations/:id
- GET /api/communications
- POST /api/communications
- PUT /api/communications/:id
- DELETE /api/communications/:id