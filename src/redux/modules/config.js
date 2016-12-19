import { Map } from 'immutable';

//- Actions
export const GET = 'config/GET';
export const GET_SUCCESS = 'config/GET_SUCCESS';
export const GET_FAILURE = 'config/GET_FAILURE';

//- State
const initialState = Map({

});

//- Reducer
export default function(state = initialState, action) {
  switch (action.type) {

    case GET_FAILURE:
      return state.set('fatalError', action.error);

    case GET_SUCCESS:
      return state.merge(action.result);

    default:
      return state;
  }
}

//- Action Creators
import getFromConfig from '../../utils/getFromMarkup';

export function get(scheme) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({type: GET});

      getFromConfig(scheme).then(
        (result) => {
          dispatch({type: GET_SUCCESS, result});
          return resolve(result);
        },
        (error) => {
          dispatch({type: GET_FAILURE, error});
          return reject(error);
        }
      )
    });
  }
};

//- Selectors
export const getConfig = (state) => state.toJS();
export const getFatalError = (state) => state.get('fatalError');