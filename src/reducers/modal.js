import { Map } from 'immutable';
import { modalTypes } from '../constants';
import { SHOW_MODAL, HIDE_MODAL, FETCH_SCHEME_AND_RESPONSE_FAILURE,
SEND_RESPONSE_FAILURE, SEND_SCHEME_FAILURE,
FETCH_SCHEME_FAILURE, FETCH_SCHEME_AND_RESPONSES_FAILURE,
FETCH_FORMS_FAILURE, SEND_DELETE_FORM_FAILURE,
SEND_DELETE_FORM_SUCCESS, SEND_SCHEME_SUCCESS,
SEND_COPY_FORM_SUCCESS, SEND_COPY_FORM_FAILURE, SEND_FORM_SUCCESS,
SEND_FORM_FAILURE } from '../actions';
import { sendFMSuccessConfig } from '../config';

const initialState = Map({
  visible: false,
  type: null,
  payload: null
});

export default function modal (modal = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return modal.merge({
        visible: true,
        type: action.modalType,
        payload: action.payload
      });

    case HIDE_MODAL:
      return modal.merge({
        visible: false,
        type: null,
        payload: null
      });

    case FETCH_SCHEME_AND_RESPONSE_FAILURE:
    case SEND_RESPONSE_FAILURE:
    case SEND_SCHEME_FAILURE:
    case FETCH_SCHEME_FAILURE:
    case FETCH_SCHEME_AND_RESPONSES_FAILURE:
    case FETCH_FORMS_FAILURE:
    case SEND_DELETE_FORM_FAILURE:
    case SEND_COPY_FORM_FAILURE:
    case SEND_FORM_FAILURE:
      return modal.merge({
        visible: true,
        type: modalTypes.ERROR_MODAL,
        payload: {
          body: action.response
        }
      })

    case SEND_SCHEME_SUCCESS:
      return modal.merge({
        visible: true,
        type: modalTypes.SUCCESS_MODAL,
        payload: {
          body: 'Форма сохранена.'
        }
      })

    case SEND_DELETE_FORM_SUCCESS:
      return modal.merge({
        type: modalTypes.SUCCESS_MODAL,
        payload: {
          body: 'Форма удалена.'
        }
      })

    case SEND_COPY_FORM_SUCCESS:
      return modal.merge({
        visible: true,
        type: modalTypes.SUCCESS_MODAL,
        payload: {
          body: 'Форма скопирована.'
        }
      })

    case SEND_FORM_SUCCESS:
      const payload = sendFMSuccessConfig(action.formId);

      return modal.merge({
        visible: true,
        type: modalTypes.SUCCESS_MODAL,
        payload
      })

    default :
      return modal;
  }
}
