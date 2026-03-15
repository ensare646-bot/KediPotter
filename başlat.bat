@echo off
title Discord Moderasyon Botu
color 0A
echo.
echo ========================================
echo   Discord Moderasyon Botu Baslatiliyor
echo ========================================
echo.

if not exist node_modules (
  echo npm paketleri yukleniyor...
  call npm install
  echo.
)

echo Bot baslatiliyor...
echo.
npm start
pause
