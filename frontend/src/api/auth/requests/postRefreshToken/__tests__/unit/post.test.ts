import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { postRefreshToken } from '../../Request';
import { apiClient } from '../../../../../core/apiClient';

// Mock the axios client
vi.mock('../../../../../core/apiClient', () => ({
  apiClient: {
    post: vi.fn(),
    defaults: {
      headers: {
        common: {}
      }
    }
  }
}));

// Mock localStorage
vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
});

describe('postRefreshToken', () => {
  const mockToken = 'existing-token';
  const mockResponse = {
    data: {
      token: 'new-token',
      refreshToken: 'new-refresh-token',
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
    vi.mocked(localStorage.getItem).mockReturnValue(mockToken);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should make a POST request to /api/auth/refresh', async () => {
    // Setup
    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);

    // Execute
    const result = await postRefreshToken();

    // Verify
    expect(apiClient.post).toHaveBeenCalledWith('/api/auth/refresh');
    expect(result).toEqual(mockResponse.data);
  });

  it('should update the token in localStorage and set the Authorization header', async () => {
    // Setup
    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);

    // Execute
    await postRefreshToken();

    // Verify
    expect(localStorage.setItem).toHaveBeenCalledWith('authToken', mockResponse.data.token);
    expect(apiClient.defaults.headers.common['Authorization']).toBe(`Bearer ${mockResponse.data.token}`);
  });

  it('should throw an error if no token exists in localStorage', async () => {
    // Setup
    vi.mocked(localStorage.getItem).mockReturnValueOnce(null);
    
    // Execute & Verify
    await expect(postRefreshToken()).rejects.toThrow('No authentication token found');
    expect(apiClient.post).not.toHaveBeenCalled();
  });

  it('should throw an error if the API call fails', async () => {
    // Setup
    const mockError = new Error('Network error');
    vi.mocked(apiClient.post).mockRejectedValueOnce(mockError);
    
    // Execute & Verify
    await expect(postRefreshToken()).rejects.toThrow(mockError);
  });
}); 