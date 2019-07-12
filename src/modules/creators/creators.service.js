import apiClient from 'api-client';

export function getCreators(params = {}) {
  return apiClient.get('/creators', { params });
}
