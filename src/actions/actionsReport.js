import sendRequest from '../utils/sendRequest';

import {
  REQUEST_DATA,
  RECEIVE_DATA,
  HEADER_BUILDED,
  SHOW_GENERATION,
  HIDE_GENERATION,
  TOGGLE_DESCRIPTION
} from './../constants/actionTypes';

// eslint-disable-line no-undef
function requestData() {
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

      const header = {
        'Автор' : 'string'
      }

      // let header = [
      //   {
      //     id: 'Автор',
      //     title: 'ФИО'
      //   }
      // ];

      JSON.parse(xhr.responseText).form.questions.forEach( (question) => {
        header[question.title] = question.type;
      });

      // let headerFromBoilerplate = JSON.parse(xhr.responseText).form.questions.map( (question) => {
      //   return (
      //     {
      //       id: question.title,
      //       title: question.title
      //     }
      //   );
      // });

      // header = header.concat(headerFromBoilerplate);

      dispatch(recieveHeader(header));
    });
  }
}

export function showReportGeneration() {
  return {
    type: SHOW_GENERATION
  }
}

export function hideReportGeneration() {
  return {
    type: HIDE_GENERATION
  }
}

export function toggleDescription() {
  return {
    type: TOGGLE_DESCRIPTION
  }
}