import { combineReducers } from 'redux';
import report from './report';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  report,
  form: formReducer
});