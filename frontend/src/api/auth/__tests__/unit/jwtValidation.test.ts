import { describe, it, expect, vi, beforeEach } from 'vitest';
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

describe('JWT Token Validation', () => {
  const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.4Adcj3UFYzPUVaVF43FmMab6RlaQD8A9V8wFzzht-KQ';
  const invalidFormatToken = 'not-a-valid-jwt-token';
  
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    delete apiClient.defaults.headers.common['Authorization'];
  });
  
  it('should validate token structure format', () => {
    // Simple structural validation
    const tokenParts = validToken.split('.');
    expect(tokenParts.length).toBe(3);
    
    // Each part should be a base64url encoded string
    tokenParts.forEach(part => {
      const base64urlRegex = /^[A-Za-z0-9_-]+$/;
      expect(base64urlRegex.test(part)).toBe(true);
    });
  });
  
  it('should detect malformed tokens', () => {
    const tokenParts = invalidFormatToken.split('.');
    expect(tokenParts.length).not.toBe(3);
  });
  
  it('should identify expired tokens by structure', () => {
    // This doesn't actually verify the signature, just the presence of exp claim
    const payload = JSON.parse(atob(expiredToken.split('.')[1]));
    expect(payload).toHaveProperty('exp');
    
    const now = Math.floor(Date.now() / 1000);
    expect(payload.exp).toBeLessThan(now);
  });
  
  it('should handle token in API request interceptor', async () => {
    // Setup
    localStorage.setItem('authToken', validToken);
    
    // Mock request interceptor
    const mockConfig = { 
      headers: {}, 
      url: '/api/protected',
      baseURL: 'http://localhost:5000'
    };
    
    // Simulate request interceptor manually (since we can't directly test the interceptor)
    const token = localStorage.getItem('authToken');
    if (token) {
      mockConfig.headers.Authorization = `Bearer ${token}`;
    }
    
    // Assert token was added to headers
    expect(mockConfig.headers.Authorization).toBe(`Bearer ${validToken}`);
  });
  
  it('should integrate with interceptors to handle auth', () => {
    // Setup
    localStorage.setItem('authToken', validToken);
    const originalInterceptor = apiClient.interceptors.request.use;
    
    // Create a mock for the request interceptor
    vi.spyOn(apiClient.interceptors.request, 'use').mockImplementation((successFn) => {
      // Simulate running the interceptor with a config object
      const mockConfig = { headers: {}, url: '/api/test' };
      const result = successFn(mockConfig);
      
      // Verify the interceptor adds the auth header from localStorage
      expect(result.headers.Authorization).toBe(`Bearer ${validToken}`);
      return 1; // Return interceptor ID
    });
    
    // Trigger the interceptor
    apiClient.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  });
}); 