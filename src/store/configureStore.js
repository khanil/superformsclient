import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

export default function configureStore(initialState, rootReducer) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware (
          thunk
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    module.hot.accept(rootReducer, () => {
      const nextRootReducer = require(rootReducer);
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}