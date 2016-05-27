import { combineReducers } from 'redux';
import page from './page';
import boilerplate from './boilerplate';
import responce from './responce';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  page,
  boilerplate,
  responce,
  form: formReducer
});