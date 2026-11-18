@echo off
cd /d "%~dp0"
call npm run db:local
if errorlevel 1 goto failed
call npm run db:seed
if errorlevel 1 goto failed
call npm start
if errorlevel 1 goto failed
exit /b 0
:failed
echo KIKO could not start. Check the error above.
pause
exit /b 1
