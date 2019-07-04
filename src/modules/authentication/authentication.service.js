import apiClient from 'api-client';

export function signIn(user) {
  return apiClient.post('/users/sign_in', { user })
    .then((response) => {
      const token = response.headers.authorization;
      apiClient.setAuthorizationHeader(token);
      localStorage.setItem('jwt', token);

      return response.data;
    });
}

export function signOut() {
  return apiClient.delete('/users/sign_out')
    .then((response) => {
      apiClient.removeAuthorizationHeader();

      return response;
    });
}
