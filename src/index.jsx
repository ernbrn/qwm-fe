import React from 'react';
import { render } from 'react-dom';
import App from 'App';
import apiClient from 'api-client';

const rootElement = document.getElementById('root');

apiClient.setAuthorizationHeader(localStorage.getItem('jwt'));

render(<App />, rootElement);
