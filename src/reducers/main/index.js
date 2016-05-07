import { combineReducers } from 'redux';
import formsList from './formsList';
import sendModal from './sendModal';
import copyModal from './copyModal';
import deleteModal from './deleteModal';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  formsList,
  sendModal,
  copyModal,
  deleteModal,
  form: formReducer
});