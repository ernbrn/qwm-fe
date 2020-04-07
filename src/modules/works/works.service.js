import apiClient from 'api-client';

export function getWorks(params = {}) {
  return apiClient.get('/works', { params });
}

export function getWork(id, params = {}) {
  return apiClient.get(`/works/${id}`, { params });
}

export function patchWork(id, work) {
  const payload = { work };
  return apiClient.patch(`/works/${id}`, payload);
}

export function postWorks(work) {
  const payload = { work };

  return apiClient.post('/works', payload);
}
