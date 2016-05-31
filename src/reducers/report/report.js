
import {
  SHOW_GENERATION,
  HIDE_GENERATION,
  FETCH_REPORT_CSV_REQUEST,
  FETCH_REPORT_CSV_SUCCESS,
  FETCH_REPORT_CSV_FAILURE
} from './../../constants/actionTypes';

const initalState = {
  isVisible: false,
  isFetching: false,
  needRefetch: true,
  csv: null,
  error: null
}

function report (state = initalState, action) {
  switch (action.type) {

    case SHOW_GENERATION:
      return Object.assign({}, state, {
        isVisible: true
      });

    case HIDE_GENERATION:
      return Object.assign({}, state, {
        isVisible: false,
        needRefetch: true
      });

    case FETCH_REPORT_CSV_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });

    case FETCH_REPORT_CSV_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        csv: action.csv,
        error: null,
        needRefetch: false
      });

    case FETCH_REPORT_CSV_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    case 'redux-form/SWAP_ARRAY_VALUES':
    case 'redux-form/REMOVE_ARRAY_VALUE':
    case 'redux-form/ADD_ARRAY_VALUE':
    case 'redux-form/CHANGE':
      return Object.assign({}, state, {
        needRefetch: true
      });

    default: 
      return state;

  }
}

export default report;