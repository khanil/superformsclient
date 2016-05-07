import { combineReducers } from 'redux';
import interview from './interview';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  interview,
  form: formReducer
});