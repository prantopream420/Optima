@echo off
setlocal
title AeroOptima Pro - Native Host Builder
color 0b

echo ============================================================================
echo   AeroOptima Pro - Native Lightweight Host (.EXE) Compiler
echo ============================================================================
set "CSC_PATH="
if exist "%SystemRoot%\Microsoft.NET\Framework64\v4.0.30319\csc.exe" (
    set "CSC_PATH=%SystemRoot%\Microsoft.NET\Framework64\v4.0.30319\csc.exe"
) else if exist "%SystemRoot%\Microsoft.NET\Framework\v4.0.30319\csc.exe" (
    set "CSC_PATH=%SystemRoot%\Microsoft.NET\Framework\v4.0.30319\csc.exe"
)

if "%CSC_PATH%"=="" (
    echo [!] Error: Microsoft .NET Framework v4.0.30319 csc.exe not found.
    pause
    exit /b 1
)

echo [*] Compiling AeroOptima_Host.cs...
"%CSC_PATH%" /target:winexe /out:"%~dp0AeroOptima_Host.exe" /platform:anycpu /optimize+ "%~dp0AeroOptima_Host.cs"

if %errorlevel% equ 0 (
    echo [+] Successfully compiled: %~dp0AeroOptima_Host.exe
) else (
    echo [!] Compilation failed.
)
pause
