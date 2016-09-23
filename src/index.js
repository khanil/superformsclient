import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
=======
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FormGeneratonApp from './containers/FormGenerationApp';
// import FormInterviewApp from './containers/FormInterviewApp';
// import ResponsesTableApp from './containers/ResponsesTableApp';
import configureStore from './store/configureStore'
import rootReducer from './reducers';

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <FormGeneratonApp/>
  </Provider>,
  document.getElementById('root')
);
>>>>>>> c9c80e5755216cfee265986d3e5ab7ce3ef21e7d
