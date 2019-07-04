import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL,
});

function setAuthorizationHeader(token) {
  instance.defaults.headers.common.Authorization = token;
}

function removeAuthorizationHeader() {
  delete instance.defaults.headers.common.Authorization;
}

function getAuthorizationHeader() {
  return this.defaults.headers.common.Authorization;
}

instance.setAuthorizationHeader = setAuthorizationHeader;
instance.removeAuthorizationHeader = removeAuthorizationHeader;
instance.getAuthorizationHeader = getAuthorizationHeader;

export default instance;
