import { combineReducers } from 'redux';
import title from './formTitle';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  title,
  form: formReducer
});