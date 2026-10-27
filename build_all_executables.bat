@echo off
setlocal
title AeroOptima Pro - Full Executable Builder
color 0b

echo ============================================================================
echo   AEROOPTIMA PRO - COMPLETE EXECUTABLE & INSTALLER BUILD SUITE
echo ============================================================================
echo.
cd /d "%~dp0"

echo [1/3] Building Liquid-Glass React Frontend (Vite)...
call npm run build
if %errorlevel% neq 0 (
    echo [!] Frontend build failed.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Compiling Native C# Lightweight Host (AeroOptima_Host.exe)...
call build_native_host.bat

echo.
echo [3/3] Packaging Full Windows NSIS Installer (.exe) & Portable (.exe)...
call npm run build:exe
if %errorlevel% neq 0 (
    echo [!] Electron package build failed.
    pause
    exit /b %errorlevel%
)

echo.
echo ============================================================================
echo   [SUCCESS] ALL WINDOWS EXECUTABLES BUILT SUCCESSFULLY!
echo ============================================================================
echo   1. Windows Setup Installer : %~dp0release\AeroOptima Pro Setup 1.0.0.exe
echo   2. Portable Executable     : %~dp0release\AeroOptima Pro 1.0.0.exe
echo   3. Native Host Binary      : %~dp0AeroOptima_Host.exe
echo ============================================================================
pause
