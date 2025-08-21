# Placify API Testing Script
# Run this script to test all your APIs quickly

Write-Host "🚀 Testing Placify APIs..." -ForegroundColor Green
Write-Host ""

# Health Check
Write-Host "1️⃣ Health Check:" -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod "http://localhost:5000/health"
    Write-Host "✅ $($health.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Server not running" -ForegroundColor Red
    exit
}

# Get Companies
Write-Host "`n2️⃣ Companies:" -ForegroundColor Yellow
$companies = Invoke-RestMethod "http://localhost:5000/api/companies"
Write-Host "✅ Found $($companies.companies.Count) companies" -ForegroundColor Green
$companies.companies | ForEach-Object { 
    Write-Host "   📍 $($_.name) - $($_.tier)" -ForegroundColor Cyan 
}

# Login
Write-Host "`n3️⃣ Login:" -ForegroundColor Yellow
$loginData = @{
    email = "admin@placify.com"
    password = "Admin123!"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $loginData -ContentType "application/json"
$token = $response.token
Write-Host "✅ Login successful! User: $($response.user.firstName) $($response.user.lastName)" -ForegroundColor Green
Write-Host "🔑 Token: $($token.Substring(0,20))..." -ForegroundColor Gray

# Get Profile
Write-Host "`n4️⃣ Get Profile:" -ForegroundColor Yellow
$headers = @{ Authorization = "Bearer $token" }
$profile = Invoke-RestMethod "http://localhost:5000/api/auth/profile" -Headers $headers
Write-Host "✅ Profile: $($profile.user.email) (Role: $($profile.user.role))" -ForegroundColor Green

# Get Jobs
Write-Host "`n5️⃣ Jobs:" -ForegroundColor Yellow
$jobs = Invoke-RestMethod "http://localhost:5000/api/jobs"
Write-Host "✅ Found $($jobs.jobs.Count) jobs" -ForegroundColor Green

# Get Users (Admin only)
Write-Host "`n6️⃣ Users (Admin):" -ForegroundColor Yellow
try {
    $users = Invoke-RestMethod "http://localhost:5000/api/users" -Headers $headers
    Write-Host "✅ Found $($users.users.Count) users" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Admin access required" -ForegroundColor Yellow
}

Write-Host "`n🎉 All tests completed!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Quick Commands:" -ForegroundColor Yellow
Write-Host "Health:     Invoke-RestMethod 'http://localhost:5000/health'" -ForegroundColor Cyan  
Write-Host "Companies:  Invoke-RestMethod 'http://localhost:5000/api/companies'" -ForegroundColor Cyan
Write-Host "Jobs:       Invoke-RestMethod 'http://localhost:5000/api/jobs'" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔑 Your admin token (copy this for authenticated requests):" -ForegroundColor Yellow
Write-Host $token -ForegroundColor Green
