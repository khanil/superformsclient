import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = /*(window.devToolsExtension ? window.devToolsExtension()(createStore) : */createStore/*)*/(
    rootReducer,
    initialState,
    applyMiddleware (
        thunk
      )
    );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}