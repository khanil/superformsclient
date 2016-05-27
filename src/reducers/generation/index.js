import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import boilerplate from './boilerplate';
import page from './page';
import sendModal from './../main/sendModal';

export default combineReducers({
  page,
  boilerplate,
  sendModal,
  form: formReducer
});