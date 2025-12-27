@echo off
echo ========================================
echo  Qeyafa AI Platform - Setup Script
echo ========================================
echo.

:: Set Node.js path explicitly
set "PATH=C:\Program Files\nodejs;%PATH%"

:: Navigate to projects folder
cd /d C:\Users\HP\WebstormProjects

echo [1/5] Creating Vite + React project...
:: Check if directory exists to avoid error
if exist "qeyafa-platform" (
    echo Project folder already exists. Skipping creation.
) else (
    call npm create vite@latest qeyafa-platform -- --template react
    if %errorlevel% neq 0 (
        echo ERROR: Failed to create Vite project
        exit /b 1
    )
)

echo.
echo [2/5] Entering project directory...
cd qeyafa-platform

echo.
echo [3/5] Installing base dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install base dependencies
    exit /b 1
)

echo.
echo [4/5] Installing Luxury Stack dependencies...
call npm install tailwindcss postcss autoprefixer framer-motion @studio-freight/lenis lucide-react react-router-dom zustand firebase
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Luxury Stack
    exit /b 1
)

echo.
echo [5/5] Initializing Tailwind CSS...
call npx tailwindcss init -p
if %errorlevel% neq 0 (
    echo ERROR: Failed to initialize Tailwind
    exit /b 1
)

echo.
echo ========================================
echo  Setup Complete!
echo ========================================

