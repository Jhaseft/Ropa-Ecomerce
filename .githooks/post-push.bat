@echo off
REM Detectar rama actual
FOR /F "tokens=*" %%i IN ('git rev-parse --abbrev-ref HEAD') DO SET BRANCH=%%i

IF "%BRANCH%"=="main" (
    echo 🚀 Push en main detectado, activando deploy en EasyPanel...
    curl -X POST http://206.183.130.17:3000/api/deploy/1af605135b9969ad58f603fc660e97e3a008dbe6c4ddf9ac
    echo ✅ Deploy automático activado
) ELSE (
    echo ⚠ Push en %BRANCH%, deploy no activado
)
