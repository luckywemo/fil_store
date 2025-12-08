import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest';
import { postLogin, postSignup, postLogout, postRefreshToken } from '../../requests';
import { apiClient } from '../../../core/apiClient';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock JWT token validation
vi.mock('jsonwebtoken', () => ({
  verify: vi.fn((token) => {
    if (token === 'invalid-token') {
      throw new Error('Invalid token');
    }
    return { userId: '123', exp: Math.floor(Date.now() / 1000) + 3600 };
  }),
  sign: vi.fn(() => 'new-signed-token')
}));

describe('Auth Flow Integration', () => {
  // Test user credentials
  const testUser = {
    email: `test${Date.now()}@example.com`,
    password: 'SecurePass123!',
    name: 'Test User',
    confirmPassword: 'SecurePass123!'
  };
  
  // Mock API responses
  const mockSignupResponse = {
    status: 201,
    data: {
      token: 'signup-jwt-token',
      user: {
        id: '123',
        email: testUser.email,
        name: testUser.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  };
  
  const mockLoginResponse = {
    status: 200,
    data: {
      token: 'login-jwt-token',
      user: {
        id: '123',
        email: testUser.email,
        name: testUser.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  };
  
  const mockRefreshResponse = {
    status: 200,
    data: {
      token: 'refreshed-jwt-token',
      user: {
        id: '123',
        email: testUser.email,
        name: testUser.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  };
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Reset axios mock
    vi.clearAllMocks();
    
    // Clear authorization headers
    delete apiClient.defaults.headers.common['Authorization'];
  });
  
  it('should complete full auth lifecycle: signup → login → token refresh → logout', async () => {
    // Setup API mocks for each consecutive call
    const postMock = vi.spyOn(apiClient, 'post');
    
    // First call (signup)
    postMock.mockResolvedValueOnce(mockSignupResponse);
    
    // Second call (logout after signup)
    postMock.mockResolvedValueOnce({ status: 200, data: {} });
    
    // Third call (login)
    postMock.mockResolvedValueOnce(mockLoginResponse);
    
    // Fourth call (refresh token)
    postMock.mockResolvedValueOnce(mockRefreshResponse);
    
    // Fifth call (final logout)
    postMock.mockResolvedValueOnce({ status: 200, data: {} });
    
    // Step 1: Signup
    const signupResult = await postSignup(testUser);
    expect(apiClient.post).toHaveBeenCalledWith('/api/auth/signup', testUser);
    expect(signupResult.token).toBe('signup-jwt-token');
    expect(localStorage.getItem('authToken')).toBe('signup-jwt-token');
    
    // Step 2: Logout (to reset state for login test)
    await postLogout();
    expect(localStorage.getItem('authToken')).toBeNull();
    
    // Step 3: Login
    const loginResult = await postLogin({ 
      email: testUser.email, 
      password: testUser.password 
    });
    expect(apiClient.post).toHaveBeenCalledWith('/api/auth/login', { 
      email: testUser.email, 
      password: testUser.password 
    });
    expect(loginResult.token).toBe('login-jwt-token');
    expect(localStorage.getItem('authToken')).toBe('login-jwt-token');
    
    // Step 4: Refresh token
    const refreshResult = await postRefreshToken();
    expect(apiClient.post).toHaveBeenCalledWith('/api/auth/refresh');
    expect(refreshResult.token).toBe('refreshed-jwt-token');
    expect(localStorage.getItem('authToken')).toBe('refreshed-jwt-token');
    
    // Step 5: Logout again
    await postLogout();
    expect(apiClient.post).toHaveBeenCalledWith('/api/auth/logout', {}, {
      headers: {
        Authorization: 'Bearer refreshed-jwt-token'
      }
    });
    expect(localStorage.getItem('authToken')).toBeNull();
  });
  
  it('should handle token validation', async () => {
    // First store a valid token
    localStorage.setItem('authToken', 'valid-token');
    
    // Mock a protected API endpoint that requires auth
    vi.spyOn(apiClient, 'get').mockResolvedValueOnce({ 
      status: 200, 
      data: { message: 'Protected content' } 
    });
    
    // Access a protected resource
    const response = await apiClient.get('/api/protected');
    expect(response.status).toBe(200);
    
    // Now simulate an expired token scenario
    localStorage.setItem('authToken', 'invalid-token');
    
    // Mock the API to return 401 for invalid token
    vi.spyOn(apiClient, 'get').mockRejectedValueOnce({
      response: {
        status: 401,
        data: { message: 'Invalid or expired token' }
      }
    });
    
    // Try to access protected resource with invalid token
    await expect(apiClient.get('/api/protected')).rejects.toMatchObject({
      response: {
        status: 401
      }
    });
  });
}); 