@echo off
echo ========================================
echo   ABS Du Hoc - Cai dat dependencies
echo ========================================

echo.
echo [1/2] Cai dat Backend...
cd /d "%~dp0backend"
call npm install
if errorlevel 1 (
    echo LOI: Khong the cai dat backend dependencies!
    pause
    exit /b 1
)

echo.
echo [2/2] Cai dat Frontend...
cd /d "%~dp0frontend"
call npm install
if errorlevel 1 (
    echo LOI: Khong the cai dat frontend dependencies!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Cai dat thanh cong!
echo   Chay start.bat de khoi dong website
echo ========================================
pause
