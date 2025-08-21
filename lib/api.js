// API Configuration for Placify Frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  login: '/api/auth/login',
  register: '/api/auth/register',
  logout: '/api/auth/logout',
  refreshToken: '/api/auth/refresh',
  forgotPassword: '/api/auth/forgot-password',
  resetPassword: '/api/auth/reset-password',
  
  // User endpoints
  profile: '/api/users/profile',
  updateProfile: '/api/users/profile',
  users: '/api/users',
  
  // Company endpoints
  companies: '/api/companies',
  companyById: (id) => `/api/companies/${id}`,
  
  // Job endpoints
  jobs: '/api/jobs',
  jobById: (id) => `/api/jobs/${id}`,
  
  // Application endpoints
  applications: '/api/applications',
  applicationById: (id) => `/api/applications/${id}`,
  
  // Review endpoints
  reviews: '/api/reviews',
  reviewById: (id) => `/api/reviews/${id}`,
  
  // Round endpoints
  rounds: '/api/rounds',
  roundById: (id) => `/api/rounds/${id}`,
  
  // Health check
  health: '/health'
};

// API client class
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('authToken') 
      : null;
    
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // PATCH request
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Create API client instance
export const apiClient = new ApiClient();

// Specific API functions
export const authAPI = {
  login: (credentials) => apiClient.post(API_ENDPOINTS.login, credentials),
  register: (userData) => apiClient.post(API_ENDPOINTS.register, userData),
  logout: () => apiClient.post(API_ENDPOINTS.logout),
  refreshToken: () => apiClient.post(API_ENDPOINTS.refreshToken),
  forgotPassword: (email) => apiClient.post(API_ENDPOINTS.forgotPassword, { email }),
  resetPassword: (token, password) => apiClient.post(API_ENDPOINTS.resetPassword, { token, password })
};

export const userAPI = {
  getProfile: () => apiClient.get(API_ENDPOINTS.profile),
  updateProfile: (data) => apiClient.put(API_ENDPOINTS.updateProfile, data),
  getUsers: (params) => apiClient.get(`${API_ENDPOINTS.users}?${new URLSearchParams(params)}`),
};

export const companyAPI = {
  getCompanies: (params) => apiClient.get(`${API_ENDPOINTS.companies}?${new URLSearchParams(params)}`),
  getCompany: (id) => apiClient.get(API_ENDPOINTS.companyById(id)),
  createCompany: (data) => apiClient.post(API_ENDPOINTS.companies, data),
  updateCompany: (id, data) => apiClient.put(API_ENDPOINTS.companyById(id), data),
  deleteCompany: (id) => apiClient.delete(API_ENDPOINTS.companyById(id))
};

export const jobAPI = {
  getJobs: (params) => apiClient.get(`${API_ENDPOINTS.jobs}?${new URLSearchParams(params)}`),
  getJob: (id) => apiClient.get(API_ENDPOINTS.jobById(id)),
  createJob: (data) => apiClient.post(API_ENDPOINTS.jobs, data),
  updateJob: (id, data) => apiClient.put(API_ENDPOINTS.jobById(id), data),
  deleteJob: (id) => apiClient.delete(API_ENDPOINTS.jobById(id))
};

export const applicationAPI = {
  getApplications: (params) => apiClient.get(`${API_ENDPOINTS.applications}?${new URLSearchParams(params)}`),
  getApplication: (id) => apiClient.get(API_ENDPOINTS.applicationById(id)),
  createApplication: (data) => apiClient.post(API_ENDPOINTS.applications, data),
  updateApplication: (id, data) => apiClient.put(API_ENDPOINTS.applicationById(id), data),
  deleteApplication: (id) => apiClient.delete(API_ENDPOINTS.applicationById(id))
};

export const reviewAPI = {
  getReviews: (params) => apiClient.get(`${API_ENDPOINTS.reviews}?${new URLSearchParams(params)}`),
  getReview: (id) => apiClient.get(API_ENDPOINTS.reviewById(id)),
  createReview: (data) => apiClient.post(API_ENDPOINTS.reviews, data),
  updateReview: (id, data) => apiClient.put(API_ENDPOINTS.reviewById(id), data),
  deleteReview: (id) => apiClient.delete(API_ENDPOINTS.reviewById(id))
};

export const roundAPI = {
  getRounds: (params) => apiClient.get(`${API_ENDPOINTS.rounds}?${new URLSearchParams(params)}`),
  getRound: (id) => apiClient.get(API_ENDPOINTS.roundById(id)),
  createRound: (data) => apiClient.post(API_ENDPOINTS.rounds, data),
  updateRound: (id, data) => apiClient.put(API_ENDPOINTS.roundById(id), data),
  deleteRound: (id) => apiClient.delete(API_ENDPOINTS.roundById(id))
};

// Health check function
export const checkAPIHealth = () => apiClient.get(API_ENDPOINTS.health);

export default apiClient;
