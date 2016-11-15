import { makeActionCreator } from '../utils';
import fetch from 'isomorphic-fetch'

export const SEND_SCHEME = 'SEND_SCHEME';
export const SEND_SCHEME_SUCCESS = 'SEND_SCHEME_SUCCESS';
export const SEND_SCHEME_FAILURE = 'SEND_SCHEME_FAILURE';

export const FETCH_SCHEME = 'FETCH_SCHEME';
export const FETCH_SCHEME_SUCCESS = 'FETCH_SCHEME_SUCCESS';
export const FETCH_SCHEME_FAILURE = 'FETCH_SCHEME_FAILURE';

export const SEND_RESPONSE = 'SEND_RESPONSE';
export const SEND_RESPONSE_SUCCESS = 'SEND_RESPONSE_SUCCESS';
export const SEND_RESPONSE_FAILURE = 'SEND_RESPONSE_FAILURE';

export const FETCH_SCHEME_AND_RESPONSES = 'FETCH_SCHEME_AND_RESPONSES';
export const FETCH_SCHEME_AND_RESPONSES_SUCCESS = 'FETCH_SCHEME_AND_RESPONSES_SUCCESS';
export const FETCH_SCHEME_AND_RESPONSES_FAILURE = 'FETCH_SCHEME_AND_RESPONSES_FAILURE';

export const FETCH_SCHEME_AND_RESPONSE = 'FETCH_SCHEME_AND_RESPONSE';
export const FETCH_SCHEME_AND_RESPONSE_SUCCESS = 'FETCH_SCHEME_AND_RESPONSE_SUCCESS';
export const FETCH_SCHEME_AND_RESPONSE_FAILURE = 'FETCH_SCHEME_AND_RESPONSE_FAILURE';

export const FETCH_FORM_CSV = 'FETCH_FORM_CSV';
export const FETCH_FORM_CSV_SUCCESS = 'FETCH_FORM_CSV_SUCCESS';
export const FETCH_FORM_CSV_FAILURE = 'FETCH_FORM_CSV_FAILURE';

export const FETCH_PERSONAL_FORMS = 'FETCH_PERSONAL_FORMS';
export const FETCH_PERSONAL_FORMS_SUCCESS = 'FETCH_PERSONAL_FORMS_SUCCESS';
export const FETCH_PERSONAL_FORMS_FAILURE = 'FETCH_PERSONAL_FORMS_FAILURE';

export const FETCH_ALL_FORMS = 'FETCH_ALL_FORMS';
export const FETCH_ALL_FORMS_SUCCESS = 'FETCH_ALL_FORMS_SUCCESS';
export const FETCH_ALL_FORMS_FAILURE = 'FETCH_ALL_FORMS_FAILURE';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const SEND_DELETE_FORM = 'SEND_DELETE_FORM';
export const SEND_DELETE_FORM_SUCCESS = 'SEND_DELETE_FORM_SUCCESS';
export const SEND_DELETE_FORM_FAILURE = 'SEND_DELETE_FORM_FAILURE';

export const SEND_COPY_FORM = 'SEND_COPY_FORM';
export const SEND_COPY_FORM_SUCCESS = 'SEND_COPY_FORM_SUCCESS';
export const SEND_COPY_FORM_FAILURE = 'SEND_COPY_FORM_FAILURE';

export const SEND_FORM = 'SEND_FORM';
export const SEND_FORM_SUCCESS = 'SEND_FORM_SUCCESS';
export const SEND_FORM_FAILURE = 'SEND_FORM_FAILURE';

export const APPLY_SEARCH_FILTER = 'APPLY_SEARCH_FILTER';

const sendSchemeInit = makeActionCreator(SEND_SCHEME, 'url', 'scheme');
const sendSchemeSuccess = makeActionCreator(SEND_SCHEME_SUCCESS, 'formId');
const sendSchemeFailure = makeActionCreator(SEND_SCHEME_FAILURE, 'response');

const fetchSchemeInit = makeActionCreator(FETCH_SCHEME, 'url');
const fetchSchemeSuccess = makeActionCreator(FETCH_SCHEME_SUCCESS, 'scheme');
const fetchSchemeFailure = makeActionCreator(FETCH_SCHEME_FAILURE, 'response');

const sendResponseInit = makeActionCreator(SEND_RESPONSE, 'url', 'responses');
const sendResponseSuccess = makeActionCreator(SEND_RESPONSE_SUCCESS);
const sendResponseFailure = makeActionCreator(SEND_RESPONSE_FAILURE, 'response');

const fetchSchemeAndResponsesInit = makeActionCreator(FETCH_SCHEME_AND_RESPONSES, 'url');
const fetchSchemeAndResponsesSuccess = makeActionCreator(FETCH_SCHEME_AND_RESPONSES_SUCCESS, 'formData', 'responses');
const fetchSchemeAndResponsesFailure = makeActionCreator(FETCH_SCHEME_AND_RESPONSES_FAILURE, 'response');

const fetchSchemeAndResponseInit = makeActionCreator(FETCH_SCHEME_AND_RESPONSE, 'url');
const fetchSchemeAndResponseSuccess = makeActionCreator(FETCH_SCHEME_AND_RESPONSE_SUCCESS, 'formData', 'response');
const fetchSchemeAndResponseFailure = makeActionCreator(FETCH_SCHEME_AND_RESPONSE_FAILURE, 'response');

const fetchFormCSVInit = makeActionCreator(FETCH_FORM_CSV, 'url');
const fetchFormCSVSuccess = makeActionCreator(FETCH_FORM_CSV_SUCCESS, 'data');
const fetchFormCSVFailure = makeActionCreator(FETCH_FORM_CSV_FAILURE, 'response');

const fetchPersonalFormsInit = makeActionCreator(FETCH_PERSONAL_FORMS, 'url');
const fetchPersonalFormsSuccess = makeActionCreator(FETCH_PERSONAL_FORMS_SUCCESS, 'forms');
const fetchPersonalFormsFailure = makeActionCreator(FETCH_PERSONAL_FORMS_FAILURE, 'response');

const fetchAllFormsInit = makeActionCreator(FETCH_ALL_FORMS, 'url');
const fetchAllFormsSuccess = makeActionCreator(FETCH_ALL_FORMS_SUCCESS, 'forms');
const fetchAllFormsFailure = makeActionCreator(FETCH_ALL_FORMS_FAILURE, 'response');

export const showModal = makeActionCreator(SHOW_MODAL, 'modalType', 'payload');
export const hideModal = makeActionCreator(HIDE_MODAL);

export const sendDeleteFormInit = makeActionCreator(SEND_DELETE_FORM, 'url', 'formId');
export const sendDeleteFormSuccess = makeActionCreator(SEND_DELETE_FORM_SUCCESS, 'formId');
export const sendDeleteFormFailure = makeActionCreator(SEND_DELETE_FORM_FAILURE, 'response', 'formId');

export const sendCopyFormInit = makeActionCreator(SEND_COPY_FORM, 'url', 'formId', 'copyName');
export const sendCopyFormSuccess = makeActionCreator(SEND_COPY_FORM_SUCCESS, 'formId', 'copyName', 'copyId', 'copyIndex');
export const sendCopyFormFailure = makeActionCreator(SEND_COPY_FORM_FAILURE, 'response', 'formId');

export const sendFormInit = makeActionCreator(SEND_FORM, 'url', 'config');
export const sendFormSuccess = makeActionCreator(SEND_FORM_SUCCESS, 'formId');
export const sendFormFailure = makeActionCreator(SEND_FORM_FAILURE, 'response', 'formId');

export const applySearchFilter = makeActionCreator(APPLY_SEARCH_FILTER, 'str');

export function sendScheme(url, scheme) {
	return dispatch => {
		dispatch( sendSchemeInit(url, scheme) );

		var xhr = new XMLHttpRequest();

		xhr.open('post', url, true) ;
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		xhr.onload = function () {
			if (xhr.status != 200) {
				dispatch( sendSchemeFailure(xhr.response) );
			} else {
				dispatch( sendSchemeSuccess(xhr.responseText) );
				document.location.pathname = '/';
			}
		}

		xhr.send(JSON.stringify(scheme));
	}
}

export function fetchScheme(url) {
	return dispatch => {
		dispatch( fetchSchemeInit(url) );

		var xhr = new XMLHttpRequest();

		xhr.open('get', url, true) ;
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		xhr.onload = function () {
			if (xhr.status != 200) {
				dispatch( fetchSchemeFailure(xhr.response) );
			} else {
				dispatch( fetchSchemeSuccess(JSON.parse(xhr.responseText)) );
			}
		}

		xhr.send();
	}
}

export function sendResponse(url, responses, successCallback) {
	return dispatch => {
		dispatch( sendResponseInit(url, responses) );

		var xhr = new XMLHttpRequest();

		xhr.open('post', url, true) ;
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		xhr.onload = function () {
			if (xhr.status != 200) {
				dispatch( sendResponseFailure(xhr.response) );
			} else {
				dispatch( sendResponseSuccess() );
				if (successCallback)
					successCallback();
			}
		}

		xhr.send(JSON.stringify(responses));
	}
}

export function fetchSchemeAndResponses(url) {
	return dispatch => {
		dispatch( fetchSchemeAndResponsesInit(url) );

		var xhr = new XMLHttpRequest();

		xhr.open('get', url, true) ;
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		xhr.onload = function () {
			if (xhr.status != 200) {
				dispatch( fetchSchemeAndResponsesFailure(xhr.response) );
			} else {
				const {
					form,
					responses
				} = JSON.parse(xhr.responseText);
				dispatch( fetchSchemeAndResponsesSuccess(form, responses) );
			}
		}

		xhr.send();
	}
}

export function fetchSchemeAndResponse(url) {
	return dispatch => {
		dispatch( fetchSchemeAndResponseInit(url) );

		var xhr = new XMLHttpRequest();

		xhr.open('get', url, true) ;
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		xhr.onload = function () {
			if (xhr.status != 200) {
				dispatch( fetchSchemeAndResponseFailure(xhr.response) );
			} else {
				const {
					form,
					response
				} = JSON.parse(xhr.responseText);
				dispatch( fetchSchemeAndResponseSuccess(form, response) );
			}
		}

		xhr.send();
	}
}

export function fetchFormCSV(url) {
	return dispatch => {
		dispatch( fetchFormCSVInit(url) );

		var xhr = new XMLHttpRequest();

		xhr.open('get', url, true) ;
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		xhr.onload = function () {
			if (xhr.status != 200) {
				dispatch( fetchFormCSVFailure(xhr.response) );
			} else {
				dispatch( fetchFormCSVSuccess(xhr.responseText) );
			}
		}

		xhr.send();
	}
}

export function fetchPersonalForms(url) {
	return dispatch => {
		dispatch( fetchPersonalFormsInit(url) );

		var xhr = new XMLHttpRequest();

		xhr.open('get', url, true) ;
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		xhr.onload = function () {
			if (xhr.status != 200) {
				dispatch( fetchPersonalFormsFailure(xhr.response) );
			} else {
				dispatch( fetchPersonalFormsSuccess( JSON.parse(xhr.responseText)) );
			}
		}

		xhr.send();
	}
}

export function fetchAllForms(url) {
	return dispatch => {
		dispatch( fetchAllFormsInit(url) );

		var xhr = new XMLHttpRequest();

		xhr.open('get', url, true) ;
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		xhr.onload = function () {
			if (xhr.status != 200) {
				dispatch( fetchAllFormsFailure(xhr.response) );
			} else {
				dispatch( fetchAllFormsSuccess(JSON.parse(xhr.responseText)) );
			}
		}

		xhr.send();
	}
}

export function sendDeleteForm(url, formId) {
	return dispatch => {
		dispatch( sendDeleteFormInit(url, formId) );

		var xhr = new XMLHttpRequest();

		xhr.open('delete', url, true) ;
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		xhr.onload = function () {
			if (xhr.status != 200) {
				dispatch( sendDeleteFormFailure(xhr.response, formId) );
			} else {
				dispatch( sendDeleteFormSuccess(formId) );
			}
		}

		xhr.send();
	}
}

export function sendCopyForm(url, formId, name) {
	return dispatch => {
		dispatch( sendCopyFormInit(url, formId, name) );

		var xhr = new XMLHttpRequest();

		xhr.open('post', url, true) ;
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		xhr.onload = function () {
			if (xhr.status != 200) {
				dispatch( sendCopyFormFailure(xhr.response, formId) );
			} else {
				const {
					id,
					index
				} = JSON.parse(xhr.responseText);
				dispatch( sendCopyFormSuccess(formId, name, id, index) );
			}
		}

		xhr.send(name);
	}
}

export function sendForm(url, formId, config) {
	return dispatch => {
		dispatch( sendFormInit(url, config) );

		var xhr = new XMLHttpRequest();

		xhr.open('post', url, true) ;
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		xhr.onload = function () {
			if (xhr.status != 200) {
				dispatch( sendFormFailure(xhr.response) );
			} else {
				dispatch( sendFormSuccess(formId) );
			}
		}

		xhr.send(JSON.stringify(config));
	}
}