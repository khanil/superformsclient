
import {
  TOGGLE_DESCRIPTION
} from './../../constants/actionTypes';

const initalState = {
  isDescriptionVisible: false
}

function page (state = initalState, action) {
  switch (action.type) {

    case TOGGLE_DESCRIPTION:
      return Object.assign({}, state, {
        isDescriptionVisible: !state.isDescriptionVisible
      });

    default: 
      return state;

  }
}

export default page;