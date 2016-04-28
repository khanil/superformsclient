import { combineReducers } from 'redux';
import interview from './interview';
import report from './report';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  interview,
  report,
  form: formReducer
});