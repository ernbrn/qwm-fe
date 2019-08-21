import apiClient from 'api-client';

export function getCreators(params = {}) {
  return apiClient.get('/creators', { params });
}

export function postCreators(creator) {
  const payload = { creator };

  return apiClient.post('/creators', payload);
}
