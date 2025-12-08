import { expect, describe, it, vi, beforeEach } from 'vitest';
import { apiClient } from '../../../core/apiClient';
import { getHealthHello } from '../../requests/getHealthHello';
import { getDatabaseStatus } from '../../requests/getDatabaseStatus';
import { getDatabaseHello } from '../../requests/getDatabaseHello';

// Mock the apiClient with proper path and mocking syntax
vi.mock('../../../core/apiClient', () => {
  const mockClient = {
    get: vi.fn()
  };
  return {
    default: mockClient,
    apiClient: mockClient
  };
});

describe('Setup API', () => {
  const mockResponse = { data: {} };
  
  beforeEach(() => {
    vi.clearAllMocks();
    (apiClient.get as any).mockResolvedValue(mockResponse);
  });

  describe('Health Endpoints', () => {
    it('getHealthHello should call the correct endpoint', async () => {
      mockResponse.data = {
        status: 'success',
        message: 'Health check endpoint is operational',
        timestamp: new Date().toISOString()
      };
      
      const result = await getHealthHello();
      
      expect(apiClient.get).toHaveBeenCalledWith('/setup/health/hello');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('Database Endpoints', () => {
    it('getDatabaseStatus should call the correct endpoint', async () => {
      mockResponse.data = {
        status: 'success',
        connected: true,
        databaseVersion: '1.0.0'
      };
      
      const result = await getDatabaseStatus();
      
      expect(apiClient.get).toHaveBeenCalledWith('/setup/database/status');
      expect(result).toEqual(mockResponse.data);
    });

    it('getDatabaseHello should call the correct endpoint', async () => {
      mockResponse.data = {
        status: 'success',
        message: 'Database connection established',
        connectionId: 'conn_12345'
      };
      
      const result = await getDatabaseHello();
      
      expect(apiClient.get).toHaveBeenCalledWith('/setup/database/hello');
      expect(result).toEqual(mockResponse.data);
    });
  });
}); 