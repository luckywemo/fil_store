import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { postLogout } from '../../Request';
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
  getItem: vi.fn().mockReturnValue('mock-token'),
  setItem: vi.fn(),
  removeItem: vi.fn()
});

describe('postLogout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    apiClient.defaults.headers.common['Authorization'] = 'Bearer mock-token';
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should make a POST request to /api/auth/logout', async () => {
    // Setup
    vi.mocked(apiClient.post).mockResolvedValueOnce({});

    // Execute
    await postLogout();

    // Verify
    expect(apiClient.post).toHaveBeenCalledWith('/api/auth/logout', {}, {
      headers: {
        Authorization: 'Bearer mock-token'
      }
    });
  });

  it('should remove the token from localStorage and clear the Authorization header', async () => {
    // Setup
    vi.mocked(apiClient.post).mockResolvedValueOnce({});

    // Execute
    await postLogout();

    // Verify
    expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
    expect(apiClient.defaults.headers.common['Authorization']).toBeUndefined();
  });

  it('should still clear localStorage and headers if the API call fails', async () => {
    // Setup
    const mockError = new Error('Network error');
    vi.mocked(apiClient.post).mockRejectedValueOnce(mockError);
    
    // Execute & Verify
    await expect(postLogout()).rejects.toThrow(mockError);
    expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
    expect(apiClient.defaults.headers.common['Authorization']).toBeUndefined();
  });
}); 