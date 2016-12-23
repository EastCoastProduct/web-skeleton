import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export function configureStore(env) {
  let createStoreWithMiddleware;

  if (env === 'development') {
    createStoreWithMiddleware = compose(
      applyMiddleware(thunk),
      autoRehydrate(),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    )(createStore);

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        createStoreWithMiddleware.replaceReducer(rootReducer);
      });
    }
  } else {
    createStoreWithMiddleware = compose(
      applyMiddleware(thunk),
      autoRehydrate(),
    )(createStore);
  }

  const store = createStoreWithMiddleware(rootReducer);
  persistStore(store, {
    whitelist: ['token', 'user'],
  });
  return store;
}

export default configureStore(process.env.NODE_ENV);
