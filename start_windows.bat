@echo off
if exist "nodejs\node.exe" (nodejs\node main.js %*) else (node main.js %*)