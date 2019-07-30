import apiClient from 'api-client';

export function getWorks(params = {}) {
  return apiClient.get('/works', { params });
}

export function postWorks(work) {
  const payload = { work };

  return apiClient.post('/works', payload);
}
