import sendRequest from '../utils/sendRequest';

import {
  REQUEST_DATA,
  RECEIVE_DATA,
  HEADER_BUILDED
} from './../constants/actionTypes';

// eslint-disable-line no-undef
export function requestData() {
  return {
    type: REQUEST_DATA
  }
}

function receiveData(json) {
  return {
    type: RECEIVE_DATA,
    answers: json.responses,
    boilerplate: json.form
  }
}

function recieveHeader(header) {
  return {
    type: HEADER_BUILDED,
    header: header
  }
}

export function fetchData(url) {
  return (dispatch) => {
    dispatch(requestData());

    sendRequest('GET', url, null, (xhr) => {

      dispatch(receiveData(JSON.parse(xhr.responseText)));

      console.log(JSON.parse(xhr.responseText));

      let header = [
        {
          id: 'Автор',
          name: 'ФИО'
        }
      ];

      let headerFromBoilerplate = JSON.parse(xhr.responseText).form.questions.map( (question) => {
        return (
          {
            id: question.title,
            name: question.title
          }
        );
      });

      header = header.concat(headerFromBoilerplate);

      dispatch(recieveHeader(header));
    });
  }
}