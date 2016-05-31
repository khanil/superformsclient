import {
  FETCH_TABLE_CSV_REQUEST,
  FETCH_TABLE_CSV_SUCCESS,
  FETCH_TABLE_CSV_FAILURE
} from './../../constants/actionTypes';

const initalState = {
  content: null,
  error: null,
  isFetching: true
}

function csv (state = initalState, action) {
  switch (action.type) {

    case FETCH_TABLE_CSV_REQUEST:
      return Object.assign({}, state, initalState);

    case FETCH_TABLE_CSV_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        content: action.csv,
        error: null
      });

    case FETCH_TABLE_CSV_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    default: 
      return state;

  }
}

export default csv;