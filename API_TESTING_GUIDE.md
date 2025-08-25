# 🚀 Placify API Testing Guide

## 📋 Complete API Endpoints Overview

### Base URL: `http://localhost:5000`

---

## 🔐 Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | User login |
| GET | `/api/auth/profile` | ✅ User | Get user profile |
| PUT | `/api/auth/profile` | ✅ User | Update user profile |
| PUT | `/api/auth/change-password` | ✅ User | Change password |

---

## 👥 User Management (`/api/users`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/users` | 🔑 Admin | Get all users (paginated) |
| GET | `/api/users/:id` | 🔑 Admin | Get user by ID |

---

## 🏢 Companies (`/api/companies`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/companies` | ❌ | Get all companies |
| GET | `/api/companies/:id` | ❌ | Get company by ID |
| GET | `/api/companies/:id/stats` | ❌ | Get company statistics |
| POST | `/api/companies` | 🔑 Admin | Create company |
| PUT | `/api/companies/:id` | 🔑 Admin | Update company |
| DELETE | `/api/companies/:id` | 🔑 Admin | Delete company |

---

## 💼 Jobs (`/api/jobs`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/jobs` | ❌ | Get all jobs (with filters) |
| GET | `/api/jobs/:id` | ❌ | Get job by ID |
| POST | `/api/jobs` | 🔑 Admin | Create job |
| PUT | `/api/jobs/:id` | 🔑 Admin | Update job |
| DELETE | `/api/jobs/:id` | 🔑 Admin | Delete job (soft delete) |

---

## 📝 Applications (`/api/applications`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/applications/my-applications` | ✅ User | Get user's applications |
| POST | `/api/applications` | ✅ User | Apply for a job |
| GET | `/api/applications/:id` | ✅ User/Admin | Get application by ID |
| PUT | `/api/applications/:id/status` | 🔑 Admin | Update application status |

---

## ⭐ Reviews (`/api/reviews`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/reviews/company/:companyId` | ❌ | Get company reviews |
| GET | `/api/reviews/my-reviews` | ✅ User | Get user's reviews |
| POST | `/api/reviews` | ✅ User | Create review |
| GET | `/api/reviews/:id` | ❌ | Get review by ID |
| PUT | `/api/reviews/:id` | ✅ User | Update own review |
| DELETE | `/api/reviews/:id` | ✅ User/Admin | Delete review |

---

## 🎯 Interview Rounds (`/api/rounds`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/rounds` | ❌ | Get interview rounds |
| POST | `/api/rounds` | ✅ User | Create round record |
| GET | `/api/rounds/:id` | ❌ | Get round by ID |
| PUT | `/api/rounds/:id` | ✅ User | Update round |
| DELETE | `/api/rounds/:id` | ✅ User/Admin | Delete round |

---

## 🔧 Admin Application Management (`/api/applications`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/applications` | 🔑 Admin | Get all applications (paginated) |
| GET | `/api/applications/:id` | ✅ User/Admin | Get application by ID |
| PUT | `/api/applications/:id/status` | 🔑 Admin | Update application status |
| PUT | `/api/applications/:id` | ✅ User | Update own application |
| DELETE | `/api/applications/:id` | ✅ User/Admin | Delete application |

---

## 🔄 Profile Management (`/api/auth`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| PUT | `/api/auth/profile` | ✅ User | Update user profile |
| PUT | `/api/auth/change-password` | ✅ User | Change password |

---

## ❤️ Health Check

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/health` | ❌ | Server health check |

---

# 🧪 Best Ways to Test Your APIs

## 1. 🎯 PowerShell Testing (Built-in Windows)

### Basic Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

### Login and Get Token
```powershell
$loginData = @{
    email = "admin@placify.com"
    password = "Admin123!"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $loginData -ContentType "application/json"
$token = $response.token
Write-Host "Token: $token"
```

### Use Token for Authenticated Requests
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

# Get user profile
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/profile" -Headers $headers
```

---

## 2. 🔥 Postman (Recommended GUI Tool)

### Installation
1. Download from [postman.com](https://postman.com)
2. Create a free account
3. Import collection (see below)

### Quick Setup
1. Create new collection: "Placify API"
2. Add environment variables:
   - `base_url`: `http://localhost:5000`
   - `token`: (will be set after login)

### Sample Requests

#### Login Request
- **Method**: POST
- **URL**: `{{base_url}}/api/auth/login`
- **Body** (JSON):
```json
{
    "email": "admin@placify.com",
    "password": "Admin123!"
}
```
- **Tests** (to auto-save token):
```javascript
if (pm.response.to.have.status(200)) {
    const response = pm.response.json();
    pm.environment.set("token", response.token);
}
```

#### Get Companies
- **Method**: GET
- **URL**: `{{base_url}}/api/companies`

#### Create Company (Admin)
- **Method**: POST
- **URL**: `{{base_url}}/api/companies`
- **Headers**: `Authorization: Bearer {{token}}`
- **Body** (JSON):
```json
{
    "name": "Test Company API",
    "description": "A test company for API testing",
    "industry": "Technology",
    "website": "https://testcompanyapi.com",
    "headquarters": "Test City",
    "employeeCount": "201-500",
    "type": "startup",
    "tier": "tier2",
    "isActive": true
}
```
**Note**: Valid employeeCount values: `"1-10"`, `"11-50"`, `"51-200"`, `"201-500"`, `"501-1000"`, `"1000+"`

#### Create Job (Admin)
- **Method**: POST
- **URL**: `{{base_url}}/api/jobs`
- **Headers**: `Authorization: Bearer {{token}}`
- **Body** (JSON):
```json
{
    "title": "Software Engineer",
    "description": "Full stack developer position",
    "companyId": "company-uuid-here",
    "location": "San Francisco",
    "jobType": "full-time",
    "workMode": "remote",
    "requirements": ["JavaScript", "React", "Node.js"],
    "salary": 120000,
    "isActive": true
}
```

#### Create Review (User)
- **Method**: POST
- **URL**: `{{base_url}}/api/reviews`
- **Headers**: `Authorization: Bearer {{token}}`
- **Body** (JSON):
```json
{
    "companyId": "company-uuid-here",
    "jobRole": "Software Engineer",
    "interviewDate": "2025-08-01",
    "overallRating": 4,
    "interviewDifficulty": "medium",
    "interviewExperience": "positive",
    "title": "Great company for API testing interview experience",
    "description": "This company provides excellent opportunities for testing APIs and learning new technologies. The interview process was well structured and the team was very professional throughout the process.",
    "pros": ["Good work culture", "Learning opportunities"],
    "cons": ["High workload"],
    "interviewRounds": 3,
    "wouldRecommend": true,
    "isAnonymous": false
}
```
**Note**: 
- Valid interviewDifficulty: `"easy"`, `"medium"`, `"hard"`
- Valid interviewExperience: `"positive"`, `"neutral"`, `"negative"`
- Description must be 50-2000 characters
- Title must be 10-100 characters

---

## 3. 🔧 Thunder Client (VS Code Extension)

1. Install "Thunder Client" in VS Code
2. Create new request
3. Similar to Postman but integrated in VS Code

---

## 4. 🎮 Browser Testing (Limited)

### Simple GET requests:
- http://localhost:5000/health
- http://localhost:5000/api/companies
- http://localhost:5000/api/jobs

---

## 5. 📜 Node.js Script Testing

Create `test-specific-endpoints.js`:

```javascript
// Test specific endpoints
const testEndpoint = async (method, endpoint, data = null, token = null) => {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    
    if (token) options.headers.Authorization = `Bearer ${token}`;
    if (data) options.body = JSON.stringify(data);
    
    try {
        const response = await fetch(`http://localhost:5000${endpoint}`, options);
        const result = await response.json();
        console.log(`${method} ${endpoint}:`, response.status, result);
        return result;
    } catch (error) {
        console.error(`${method} ${endpoint} failed:`, error.message);
    }
};

// Run tests
const runTests = async () => {
    console.log('🧪 Testing Placify APIs...\n');
    
    // 1. Health check
    await testEndpoint('GET', '/health');
    
    // 2. Login
    const loginResult = await testEndpoint('POST', '/api/auth/login', {
        email: 'admin@placify.com',
        password: 'Admin123!'
    });
    
    const token = loginResult?.token;
    
    // 3. Get companies
    await testEndpoint('GET', '/api/companies');
    
    // 4. Get profile (requires auth)
    if (token) {
        await testEndpoint('GET', '/api/auth/profile', null, token);
    }
    
    // 5. Get users (admin only)
    if (token) {
        await testEndpoint('GET', '/api/users', null, token);
    }
};

runTests();
```

---

# 🎯 Quick Testing Commands

## Test All Basic Endpoints
```powershell
# Health
Invoke-RestMethod "http://localhost:5000/health"

# Companies
Invoke-RestMethod "http://localhost:5000/api/companies"

# Jobs
Invoke-RestMethod "http://localhost:5000/api/jobs"

# Login
$login = @{email="admin@placify.com";password="Admin123!"} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $login -ContentType "application/json"
$token = $response.token

# Get Profile (with auth)
$headers = @{Authorization="Bearer $token"}
Invoke-RestMethod "http://localhost:5000/api/auth/profile" -Headers $headers
```

---

# 📊 Expected Response Formats

## Success Response
```json
{
    "success": true,
    "message": "Operation successful",
    "data": { ... },
    "pagination": { ... } // for paginated responses
}
```

## Error Response
```json
{
    "success": false,
    "message": "Error description",
    "errors": [...] // for validation errors
}
```

---

# 🔑 Authentication Notes

- **Public**: Health, Companies (read), Jobs (read), Reviews (read)
- **User Auth**: Profile, Applications, Reviews (CRUD)
- **Admin Only**: User management, Company management, Job management

---

# 🚀 Next Steps

1. **Start with health check** to ensure server is running
2. **Test login** to get authentication token
3. **Test public endpoints** (companies, jobs)
4. **Test authenticated endpoints** with token
5. **Create sample data** using admin endpoints
6. **Test user flows** (register → login → apply → review)

---

**Happy Testing! 🎉**
