import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './rootReducer';

function configureState() {
  const middleware = [];
  let store;
  if (process.env.NODE_ENV === 'development') {
    store = createStore(
      reducer,
      composeWithDevTools(applyMiddleware(...middleware))
    );
  } else {
    store = createStore(reducer, applyMiddleware(...middleware));
  }

  return {
    ...store,
  };
}

export const store = configureState();
