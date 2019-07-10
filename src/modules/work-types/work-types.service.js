import apiClient from 'api-client';

export function getWorkTypes() {
  return apiClient.get('/work_types').then(response => response);
}

export function postWorkTypes(data) {
  const payload = {
    work_type: data,
  };

  return apiClient.post('/work_types', payload);
}
