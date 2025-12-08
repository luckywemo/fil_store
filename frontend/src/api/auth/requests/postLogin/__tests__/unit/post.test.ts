import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { postLogin } from '../../Request';
import { apiClient, setAuthToken, setRefreshToken } from '../../../../../core/apiClient';

// Mock the axios client and helper functions
vi.mock('../../../../../core/apiClient', () => ({
  apiClient: {
    post: vi.fn(),
    defaults: {
      headers: {
        common: {}
      }
    }
  },
  setAuthToken: vi.fn(),
  setRefreshToken: vi.fn()
}));

// Mock localStorage
vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
});

describe('postLogin', () => {
  const mockCredentials = {
    email: 'test@example.com',
    password: 'password123'
  };

  const mockResponse = {
    data: {
      token: 'mock-token',
      refreshToken: 'mock-refresh-token',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01'
      }
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should make a POST request to /api/auth/login with credentials', async () => {
    // Setup
    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);

    // Execute
    const result = await postLogin(mockCredentials);

    // Verify
    expect(apiClient.post).toHaveBeenCalledWith('/api/auth/login', mockCredentials);
    expect(result).toEqual(mockResponse.data);
  });

  it('should store the token using helper functions', async () => {
    // Setup
    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);

    // Execute
    await postLogin(mockCredentials);

    // Verify helper functions were called
    expect(setAuthToken).toHaveBeenCalledWith(mockResponse.data.token);
    expect(setRefreshToken).toHaveBeenCalledWith(mockResponse.data.refreshToken);
  });

  it('should throw an error if the API call fails', async () => {
    // Setup
    const mockError = new Error('Network error');
    vi.mocked(apiClient.post).mockRejectedValueOnce(mockError);
    
    // Execute & Verify
    await expect(postLogin(mockCredentials)).rejects.toThrow(mockError);
  });
}); 