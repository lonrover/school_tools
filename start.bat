@echo off
chcp 65001 > nul
title 实验室管理系统

echo ================================
echo   实验室管理系统 正在启动
echo ================================
echo.

:: 切换到当前脚本所在目录
cd /d %~dp0

:: 检查 Node.js 是否安装
node -v > nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到 Node.js
    echo 请先安装 Node.js（推荐 LTS 版本）
    echo https://nodejs.org
    echo.
    pause
    exit
)

:: 如果没有 node_modules，则自动安装依赖
if not exist node_modules (
    echo [信息] 首次运行，正在安装依赖...
    npm install
    echo.
)

echo [信息] 正在启动服务...
echo.

:: 启动服务
node server.js

echo.
echo 服务已停止
pause
