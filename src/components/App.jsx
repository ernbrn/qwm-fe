import React from 'react';
import CenteredAppContainer from 'shared/CenteredAppContainer';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from 'configureStore';
import AppRoutes from 'AppRoutes';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeaderBar from 'HeaderBar';

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Provider store={configureStore()}>
        <ConnectedRouter history={history}>
          <HeaderBar />
          <CenteredAppContainer>
            <AppRoutes />
          </CenteredAppContainer>
        </ConnectedRouter>
      </Provider>
    </React.Fragment>
  );
}
