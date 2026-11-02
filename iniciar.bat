@echo off
chcp 65001 >nul
title Para ti - servidor local
cd /d "%~dp0"
echo.
echo  Abriendo la pagina en http://localhost:8000
echo  (deja esta ventana abierta mientras la ves; ciérrala al terminar)
echo.
start "" "http://localhost:8000"
where python >nul 2>nul && (python -m http.server 8000 & goto :fin)
where py >nul 2>nul && (py -m http.server 8000 & goto :fin)
echo  No encontre Python. Instalalo desde https://www.python.org/downloads/ (marca "Add to PATH")
echo  o usa la extension "Live Server" de VS Code.
pause
:fin
