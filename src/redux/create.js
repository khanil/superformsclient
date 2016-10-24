import { createStore, applyMiddleware, compose } from 'redux';
import customPromiseMiddleware from './middleware/customPromiseMiddleware';
import thunk from 'redux-thunk';

export default function configureStore(initialState, rootReducer) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware (
          customPromiseMiddleware,
          thunk
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
}