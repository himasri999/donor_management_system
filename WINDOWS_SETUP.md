# Windows Setup Guide - Step by Step

## Step 1: Install PostgreSQL

### Download & Install
1. Go to https://www.postgresql.org/download/windows/
2. Download PostgreSQL installer (latest version)
3. Run installer as Administrator
4. **IMPORTANT**: Remember the password you set for `postgres` user
5. Keep default port: 5432
6. Install pgAdmin 4 (check the box)

### Verify Installation
```cmd
# Open Command Prompt and test
psql --version
```

## Step 2: Setup Database

### Option A: Automated Setup (Recommended)
```cmd
cd backend
set DB_PASSWORD=your_postgres_password
npm run setup-db
```

### Option B: Manual Setup via psql
```cmd
# Connect to PostgreSQL
psql -U postgres

# Create database (in psql shell)
CREATE DATABASE donor_management;
\q

# Run migration
psql -U postgres -d donor_management -f "database\migrations\init.sql"
```

### Option C: Using pgAdmin 4
1. Open pgAdmin 4 from Start Menu
2. Enter master password (if prompted)
3. Expand "Servers" → "PostgreSQL"
4. Right-click "Databases" → Create → Database
5. Name: `donor_management`, click Save
6. Right-click `donor_management` → Query Tool
7. File → Open → Select `database\migrations\init.sql`
8. Click Execute (▶️ button)

## Step 3: Backend Setup

### Install Dependencies
```cmd
cd backend
npm install
```

### Configure Environment
Edit `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=donor_management
DB_USER=postgres
DB_PASSWORD=your_actual_postgres_password
JWT_SECRET=my-secret-key-123
NODE_ENV=development
```

### Test Database Connection
```cmd
node test-connection.js
```
Should show: ✅ Database connection successful!

### Start Backend Server
```cmd
npm run dev
```
Server starts at: http://localhost:3000

## Step 4: Test API

### Test Login Endpoint
```cmd
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}"
```

### Expected Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@example.com"
  }
}
```

## Common Issues & Solutions

### PostgreSQL Service Not Running
```cmd
# Start PostgreSQL service
net start postgresql-x64-14

# Check if port 5432 is listening
netstat -an | findstr 5432
```

### "psql is not recognized"
Add PostgreSQL bin to PATH:
1. Find PostgreSQL installation (usually `C:\Program Files\PostgreSQL\14\bin`)
2. Add to System PATH environment variable
3. Restart Command Prompt

### Connection Refused Error
1. Check PostgreSQL service is running
2. Verify port 5432 is not blocked by firewall
3. Check `pg_hba.conf` file for authentication settings

### Authentication Failed
1. Verify password in `.env` matches PostgreSQL password
2. Try connecting with psql first: `psql -U postgres`
3. Reset postgres password if needed

### Module Not Found
```cmd
# Clear and reinstall
rmdir /s node_modules
del package-lock.json
npm install
```

## Quick Commands Reference

```cmd
# PostgreSQL Commands
psql -U postgres                          # Connect as postgres user
\l                                         # List databases
\c donor_management                        # Connect to database
\dt                                        # List tables
\q                                         # Quit psql

# Backend Commands
npm run dev                                # Start development server
npm run build                              # Build for production
npm start                                  # Start production server
npm test                                   # Run tests
node test-connection.js                    # Test database connection
```