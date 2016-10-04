import { Map } from 'immutable';
import { FETCH_SCHEME, FETCH_SCHEME_SUCCESS, FETCH_SCHEME_FAILURE,
SEND_SCHEME, SEND_SCHEME_SUCCESS, SEND_SCHEME_FAILURE,
SEND_RESPONSE, SEND_RESPONSE_SUCCESS, SEND_RESPONSE_FAILURE,
FETCH_SCHEME_AND_RESPONSES, FETCH_SCHEME_AND_RESPONSES_SUCCESS,
FETCH_SCHEME_AND_RESPONSES_FAILURE,
FETCH_SCHEME_AND_RESPONSE, FETCH_SCHEME_AND_RESPONSE_SUCCESS,
FETCH_SCHEME_AND_RESPONSE_FAILURE,
FETCH_FORMS, FETCH_FORMS_SUCCESS, FETCH_FORMS_FAILURE,
SEND_DELETE_FORM_SUCCESS, SEND_COPY_FORM_SUCCESS, SEND_FORM_SUCCESS } from '../actions'

const initialState = Map({
  isFetching: false,
  error: null
});

export default function formData (formData = initialState, action) {
  switch (action.type) {
    case FETCH_SCHEME_AND_RESPONSE:
    case FETCH_SCHEME_AND_RESPONSES:
    case SEND_SCHEME:
    case FETCH_SCHEME:
    case FETCH_FORMS:
      return formData.set('isFetching', true);

    case FETCH_SCHEME_AND_RESPONSE_FAILURE:
    case SEND_RESPONSE_FAILURE:
    case SEND_SCHEME_FAILURE:
    case FETCH_SCHEME_FAILURE:
    case FETCH_SCHEME_AND_RESPONSES_FAILURE:
    case FETCH_FORMS_FAILURE:
      return formData.merge({
        isFetching: false
        // error: action.response
      });

    case FETCH_SCHEME_SUCCESS:
      return formData.merge({
        isFetching: false,
        ...action.scheme
      });

    case SEND_SCHEME_SUCCESS:
      if ( !formData.has('id') ) {
        return formData.merge({
          isFetching: false,
          id: action.formId
        });
      }
      return formData.set('isFetching', false);

    case FETCH_SCHEME_AND_RESPONSES_SUCCESS:
      return formData.merge({
        responses: action.responses,
        ...action.formData
      });

    case FETCH_SCHEME_AND_RESPONSE_SUCCESS:
      return formData.merge({
        response: action.response,
        ...action.formData
      })

    case FETCH_FORMS_SUCCESS:
      return formData.merge({
        forms: action.forms
      });

    case SEND_DELETE_FORM_SUCCESS:
      return formData.update('forms', (forms) => {
        const id = forms.findKey(form => form.get('id') === action.formId);

        console.log(id);

        if (id === undefined)
          return forms;

        return forms.delete(id);
      });

    case SEND_COPY_FORM_SUCCESS:
      return formData.update('forms', (forms) => {
        const id = forms.findKey(form => form.get('id') === action.formId);

        return forms.push(forms.get(id).merge({
          id: action.copyId,
          index: action.copyIndex,
          title: action.copyName,
          created: Date.now(),
          sent: null,
          edited: null,
          expires: null,
          allowrefill: false
        }));
      });

    case SEND_FORM_SUCCESS:
      return formData.update('forms', (forms) => {
        const id = forms.findKey(form => form.get('id') === action.formId);

        return forms.setIn([id, 'sent'], Date.now());
      });

    default:
      return formData;
  }
}