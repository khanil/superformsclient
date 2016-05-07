
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  HEADER_BUILDED,
  SHOW_GENERATION,
  HIDE_GENERATION,
  TOGGLE_DESCRIPTION
} from './../../constants/actionTypes';

const initalState = {
  answers: [],
  boilerplate: {},
  header: [],
  isFetching: true,
  isDescriptionVisible: false,
  isGenerationVisible: false
}

function report (state = initalState, action) {
  switch (action.type) {

    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_DATA:
      return Object.assign({}, state, {
        answers: action.answers,
        boilerplate: action.boilerplate
      });

    case HEADER_BUILDED:
      return Object.assign({}, state, {
        isFetching: false,
        header: action.header
      });

    case SHOW_GENERATION:
      return Object.assign({}, state, {
        isGenerationVisible: true
      });

    case HIDE_GENERATION:
      return Object.assign({}, state, {
        isGenerationVisible: false
      });

    case TOGGLE_DESCRIPTION:
      return Object.assign({}, state, {
        isDescriptionVisible: !state.isDescriptionVisible
      });

    default: 
      return state;

  }
}

export default report;