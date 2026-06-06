@echo off
echo ==========================================
echo    GOO GHOUL - Website Setup
echo ==========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo 1. Go to https://nodejs.org
    echo 2. Click the green "LTS" button to download
    echo 3. Run the installer (click Next, Next, Next...)
    echo 4. Close and reopen this command window
    echo 5. Run this SETUP.bat again
    echo.
    echo Press any key to open the Node.js website...
    pause >nul
    start https://nodejs.org
    exit
)

echo [OK] Node.js is installed!
echo.

REM Check if we're in the right folder
if not exist "package.json" (
    echo [ERROR] I can't find the project files!
    echo Make sure you extracted the ZIP file first.
    echo.
    echo Here's what to do:
    echo 1. Right-click on GOOGHOUL-source-code.zip
    echo 2. Click "Extract All..."
    echo 3. Choose your folder: C:\Users\Mxrti\OneDrive\Desktop\GOOGHOUL
    echo 4. Then double-click this SETUP.bat file again
    echo.
    pause
    exit
)

echo Step 1: Installing packages (this may take 1-2 minutes)...
echo ----------------------------------------------------------------
call npm install
if errorlevel 1 (
    echo [ERROR] Something went wrong during install.
    echo Try running: npm install --force
    pause
    exit
)

echo.
echo Step 2: Starting the website...
echo ----------------------------------------------------------------
echo.
echo Your GOO GHOUL website will open in your browser!
echo It will be at: http://localhost:5173
echo.
echo To stop the website later, press Ctrl+C in this window
echo or just close this window.
echo.
echo ==========================================
echo    Starting... enjoy your ghost! 👻
echo ==========================================
echo.

start http://localhost:5173
npm run dev

pause
