

//- Actions
export const FETCH = 'form/FETCH';
export const FETCH_SUCCESS = 'form/FETCH_SUCCESS';
export const FETCH_FAILURE = 'form/FETCH_FAILURE';

//- State

//- Reducer

//- Action Creators
export function fetch(id) {
  const uri = `/api/forms/${id}`;
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAILURE],
    promise: (client) => client.get(uri),
    id
  }
}

//- Selectors
