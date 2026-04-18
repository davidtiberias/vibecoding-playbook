@echo off
echo Building and deploying to GitHub Pages...

echo [1/3] Building the project...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo Build failed!
    exit /b %ERRORLEVEL%
)

echo [2/3] Generating sitemap...
call npm run generate-sitemap
if %ERRORLEVEL% neq 0 (
    echo Sitemap generation failed!
    exit /b %ERRORLEVEL%
)

echo [3/3] Deploying to GitHub Pages...
call npx gh-pages -d dist/client
if %ERRORLEVEL% neq 0 (
    echo Deployment failed!
    exit /b %ERRORLEVEL%
)

echo Deployment successful!
pause
