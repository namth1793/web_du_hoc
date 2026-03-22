@echo off
echo ========================================
echo   ABS Du Hoc - Khoi dong Website
echo ========================================
echo.
echo Backend: http://localhost:5009
echo Frontend: http://localhost:5173
echo.
echo Nhan Ctrl+C de dung server
echo ========================================

cd /d "%~dp0backend"
if not exist "node_modules" (
    echo Chua cai dat dependencies. Dang cai dat...
    call npm install
)

start "ABS Du Hoc - Backend" cmd /k "cd /d "%~dp0backend" && npm run dev"

timeout /t 2 /nobreak >nul

cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo Chua cai dat frontend dependencies. Dang cai dat...
    call npm install
)

start "ABS Du Hoc - Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

timeout /t 3 /nobreak >nul
start http://localhost:5173

echo.
echo Website da khoi dong tai http://localhost:5173
pause
