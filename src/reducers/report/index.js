import { combineReducers } from 'redux';
import csv from './csv';
import page from './page';
import report from './report';
import table from './table';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  csv,
  page,
  report,
  table,
  form: formReducer
});