

//- Actions
export const FETCH = 'response/FETCH';
export const FETCH_SUCCESS = 'response/FETCH_SUCCESS';
export const FETCH_FAILURE = 'response/FETCH_FAILURE';

export const FETCH_XLSX = 'response/FETCH_XLSX';
export const FETCH_XLSX_SUCCESS = 'response/FETCH_XLSX_SUCCESS';
export const FETCH_XLSX_FAILURE = 'response/FETCH_XLSX_FAILURE';

//- State

//- Reducer

//- Action Creators
export function fetch(formId) {
  const uri = `/api/forms/${formId}/responses`;
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAILURE],
    promise: (client) => client.get(uri),
    formId
  }
}
export function fetchXLSX(formId) {
  const uri = `/api/forms/${formId}/responses/xlsx`;
  return {
    types: [FETCH_XLSX, FETCH_XLSX_SUCCESS, FETCH_XLSX_FAILURE],
    promise: (client) => client.get(uri).then(
      () => { document.location.pathname = uri }
    ),
    formId
  }
}

//- Selectors
