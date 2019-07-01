import React from 'react';
import { render } from 'react-dom';
import App from 'App';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';

const rootElement = document.getElementById('root');

render((
  <Provider store={configureStore()}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
), rootElement);
