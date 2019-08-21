import apiClient from 'api-client';

export function postWorks(work) {
  const payload = { work };

  return apiClient.post('/works', payload);
}
