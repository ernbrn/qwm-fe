import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogicMiddleware } from 'redux-logic';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import appLogic from './logic';

export const history = createBrowserHistory();

const middlewares = [
  routerMiddleware(history),
  createLogicMiddleware(appLogic),
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default function () {
  const store = createStore(
    rootReducer(history),
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  return store;
}
