@echo off
echo Starting Donor Management System Backend...
echo.

echo Checking database connection...
node test-connection.js

if %errorlevel% neq 0 (
    echo.
    echo Database connection failed. Please check your PostgreSQL setup.
    pause
    exit /b 1
)

echo.
echo Starting development server...
npm run dev