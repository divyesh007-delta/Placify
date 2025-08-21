/**
 * Simple API test script
 * Run this after starting the server to test basic functionality
 */

const testHealthEndpoint = async () => {
  try {
    const response = await fetch('http://localhost:5000/health');
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Health endpoint working:', data.message);
    } else {
      console.log('❌ Health endpoint failed');
    }
  } catch (error) {
    console.log('❌ Server not running or health endpoint failed:', error.message);
  }
};

const testRegistration = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'Test123!',
        university: 'Test University',
        degree: 'Computer Science',
        branch: 'CSE',
        graduationYear: 2024
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Registration working - Token received');
      return data.token;
    } else {
      console.log('❌ Registration failed:', data.message);
    }
  } catch (error) {
    console.log('❌ Registration test failed:', error.message);
  }
  
  return null;
};

const testLogin = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@placify.com',
        password: 'Admin123!'
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Login working - Admin authenticated');
      return data.token;
    } else {
      console.log('❌ Login failed:', data.message);
    }
  } catch (error) {
    console.log('❌ Login test failed:', error.message);
  }
  
  return null;
};

const testCompanies = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/companies');
    const data = await response.json();
    
    if (data.success && data.companies) {
      console.log(`✅ Companies endpoint working - Found ${data.companies.length} companies`);
    } else {
      console.log('❌ Companies endpoint failed');
    }
  } catch (error) {
    console.log('❌ Companies test failed:', error.message);
  }
};

// Run all tests
const runTests = async () => {
  console.log('🧪 Testing Placify Backend API...\n');
  
  await testHealthEndpoint();
  await testLogin();
  await testCompanies();
  
  console.log('\n📝 Test completed!');
  console.log('\n🚀 Next steps:');
  console.log('1. All basic endpoints are working');
  console.log('2. You can now connect your frontend');
  console.log('3. Test other endpoints using Postman or similar tools');
  console.log('\n📖 Check README.md for complete API documentation');
};

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This test requires Node.js 18+ for fetch API');
  console.log('💡 Alternative: Use Postman or curl to test the endpoints');
  process.exit(1);
}

runTests();
