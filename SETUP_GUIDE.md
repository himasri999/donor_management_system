# Complete Setup Guide - Donor Management System

## 1. PostgreSQL Installation & Setup

### Install PostgreSQL (Windows)
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run installer, set password for `postgres` user (remember this!)
3. Default port: 5432
4. Install pgAdmin 4 (included in installer)

### Verify Installation
```cmd
psql --version
```

## 2. Database Setup

### Method 1: Using psql (Command Line)
```cmd
# Connect as postgres user
psql -U postgres

# Create database
CREATE DATABASE donor_management;

# Exit psql
\q

# Run migration script
psql -U postgres -d donor_management -f "database/migrations/init.sql"
```

### Method 2: Using pgAdmin 4
1. Open pgAdmin 4
2. Connect to PostgreSQL server (localhost:5432)
3. Right-click "Databases" → Create → Database
4. Name: `donor_management`
5. Right-click database → Query Tool
6. Open `database/migrations/init.sql` and execute

### Verify Database Setup
```cmd
# Connect to database
psql -U postgres -d donor_management

# List tables
\dt

# Check users table
SELECT * FROM users;

# Exit
\q
```

## 3. Backend Setup

### Install Dependencies
```cmd
cd backend
npm install
```

### Configure Environment
Update `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=donor_management
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### Build & Run
```cmd
# Development mode
npm run dev

# Production build
npm run build
npm start

# Run tests
npm test
```

### Verify Backend
- Server runs on: http://localhost:3000
- Test login: POST http://localhost:3000/api/auth/login
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

## 4. Common Connection Issues

### PostgreSQL Not Starting
```cmd
# Windows - Start service
net start postgresql-x64-14

# Check if running
netstat -an | findstr 5432
```

### Connection Refused
- Check PostgreSQL service is running
- Verify port 5432 is open
- Check `pg_hba.conf` for authentication settings

### Authentication Failed
- Verify username/password in `.env`
- Check PostgreSQL user permissions
- Reset postgres password if needed

## 5. Quick Test Commands

### Test Database Connection
```cmd
psql -U postgres -d donor_management -c "SELECT NOW();"
```

### Test Backend API
```cmd
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}"
```

## 6. Troubleshooting

### Port Already in Use
```cmd
# Find process using port 3000
netstat -ano | findstr :3000
# Kill process
taskkill /PID <process_id> /F
```

### Database Connection Error
1. Check PostgreSQL service status
2. Verify credentials in `.env`
3. Test connection with psql
4. Check firewall settings

### Module Not Found Errors
```cmd
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```