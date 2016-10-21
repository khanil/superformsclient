import { Map } from 'immutable';
import { FETCH_SCHEME, FETCH_SCHEME_SUCCESS, FETCH_SCHEME_FAILURE,
SEND_SCHEME, SEND_SCHEME_SUCCESS, SEND_SCHEME_FAILURE,
SEND_RESPONSE, SEND_RESPONSE_SUCCESS, SEND_RESPONSE_FAILURE,
FETCH_SCHEME_AND_RESPONSES, FETCH_SCHEME_AND_RESPONSES_SUCCESS,
FETCH_SCHEME_AND_RESPONSES_FAILURE,
FETCH_SCHEME_AND_RESPONSE, FETCH_SCHEME_AND_RESPONSE_SUCCESS,
FETCH_SCHEME_AND_RESPONSE_FAILURE,
FETCH_ALL_FORMS, FETCH_ALL_FORMS_SUCCESS, FETCH_ALL_FORMS_FAILURE,
FETCH_PERSONAL_FORMS, FETCH_PERSONAL_FORMS_SUCCESS, FETCH_PERSONAL_FORMS_FAILURE,
SEND_DELETE_FORM_SUCCESS, SEND_COPY_FORM_SUCCESS, SEND_FORM_SUCCESS, APPLY_SEARCH_FILTER } from '../actions'

const initialState = Map({
  isFetching: false,
  searchStr: '',
  error: null
});

export default function formData (formData = initialState, action) {
  switch (action.type) {
    case APPLY_SEARCH_FILTER:
      return formData.set('searchStr', action.str);

    case FETCH_SCHEME_AND_RESPONSE:
    case FETCH_SCHEME_AND_RESPONSES:
    case SEND_SCHEME:
    case FETCH_SCHEME:
      return formData.set('isFetching', true);

    case FETCH_ALL_FORMS:
      return formData.set('aFetching', true);
    case FETCH_PERSONAL_FORMS:
      return formData.set('pFetching', true);

    case FETCH_SCHEME_AND_RESPONSE_FAILURE:
    case SEND_RESPONSE_FAILURE:
    case SEND_SCHEME_FAILURE:
    case FETCH_SCHEME_FAILURE:
    case FETCH_SCHEME_AND_RESPONSES_FAILURE:
    case FETCH_ALL_FORMS_FAILURE:
    case FETCH_PERSONAL_FORMS_FAILURE:
      return formData.merge({
        isFetching: false,
        error: action.response
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

    case FETCH_ALL_FORMS_SUCCESS:
      return formData.merge({
        aForms: action.forms,
        aFetching: false
      });

    case FETCH_PERSONAL_FORMS_SUCCESS:
      return formData.merge({
        pForms: action.forms,
        pFetching: false
      });

    case SEND_DELETE_FORM_SUCCESS:
      return formData.update('pForms', (forms) => {
        const id = forms.findKey(form => form.get('id') === action.formId);

        console.log(id);

        if (id === undefined)
          return forms;

        return forms.delete(id);
      });

    case SEND_COPY_FORM_SUCCESS:
      return formData.update('pForms', (forms) => {
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
      return formData.update('pForms', (forms) => {
        const id = forms.findKey(form => form.get('id') === action.formId);

        return forms.setIn([id, 'sent'], Date.now());
      });

    default:
      return formData;
  }
}