import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';
import { bindFunctions } from '../utils';
import { fetchSchemeAndResponses, fetchFormCSV, hideModal } from '../actions';

import Moment from 'moment';
Moment.locale('ru');
const formatDate = 'DD/MM/YY';
const formatTime = 'HH:mm';

export default class ResponsesTableApp extends AppComponent {
  constructor(props) {
    super(props);

    bindFunctions.call(this, ['renderTableHeader', 'renderTableRows', 'renderTableRow',
      'rowClickHandler', 'csvClickHandler', 'pushSection']);
  }

  componentWillMount() {
    const urlType = 'getUrl';
    const url = this.getUrl(urlType);
    this.props.fetchSchemeAndResponses(url);
  }

  pushSection(length, text, key) {
    return <th key={key} colSpan={length} style={{textAlign: 'center', verticalAlign: 'middle'}}>{text}</th>
  }

  renderTableHeader(scheme) {
    const header = [<th>#</th>, <th>Дата</th>];
    const sections = [];
    let sLength = 2; //default, because of # and date columns
    let sCounter = 0;
    let sName = '';
    header.push( scheme.get('items').map((item, i) => {
      const item_type = item.get('_type');

      if (item_type === 'delimeter') {
        if (sCounter === 0) {
          sections.push( this.pushSection(sLength, sName, sCounter) );
          sLength = 0;
          sCounter++;
          sName = item.get('title');
        }

        if (sLength) {
          sections.push( this.pushSection(sLength, sName, sCounter) );
          sLength = 0;
          sCounter++;
          sName = item.get('title');
        }
      }

      if (item_type !== 'question')
        return null;

      const title = item.get('title');
      sLength++;

      return (
        <th key={i}>{title}</th>
      );
    }));

    if (sName) {
      const length = sLength || 1;
      sections.push( this.pushSection(length, sName, sCounter) );
    }

    console.log(sections);

    return (
      <thead>
        { sections.length ? <tr>{sections}</tr> : null }
        <tr>{header}</tr>
      </thead>
    );
  }

  renderTableRows(responses, scheme) {
    const questions = scheme.get('items').filter(item => item.get('_type') === 'question');

    return responses.map((response, i) => (
      <tr key={i} onClick={() => this.rowClickHandler(response.get('id'))}
        style={{cursor: 'pointer'}}>
        {this.renderTableRow(response.get('list'), i, response.get('received'), questions)}</tr>
    ));
  }

  renderTableRow(response, rowN, date, questions) {
    const row = [
      <td key={`${rowN}_0`}>{rowN + 1}</td>,
      <td key={`${rowN}_1`}>{Moment(date).format(`${formatDate} ${formatTime}`)}</td>
    ];

    row.push( response.map((answer, i) => {
      const type = questions.getIn([i, 'type']);
      console.log(type);
      let text = answer;
      console.log(text);

      switch (type.toUpperCase()) {
        case 'DATE' :
          text = Moment(answer).format(formatDate);
          break;
        case 'TIME' :
          text = Moment(answer).format(formatTime);
          break;
        case 'DATETIME' :
          text = Moment(answer).format(formatDate + ' ' + formatTime);
          break;
        case 'SELECT':
          /** For previous releases */
          if (typeof(answer) === 'string')
            break;
          text = answer.join('; ');
          break;
        default:
          break;
      }

      return (
        <td key={`${rowN}_${i + 2}`}>{text}</td>
      )
    }));

    return row;
  }

  rowClickHandler(responseId) {
    const urlType = 'responsePreviewUrl';
    const url = this.getUrl(urlType).replace('response_id', responseId);
    document.location.pathname = url;
  }

  csvClickHandler() {
    const urlType = 'buildCSVUrl';
    const url = this.getUrl(urlType);
    document.location.pathname = url;
  }

  render() {
    if (this.props.scheme === undefined || this.props.responses === undefined)
      return null;

    return (
      <div>
        <h1>{this.props.scheme.get('title')}</h1>
        <button type="button" className="btn btn-default" style={{marginBottom: '8px'}} onClick={this.csvClickHandler}>Выгрузить в XLSX</button>
        <div className='table-responsive'>
          <table className="table table-bordered table-hover table-responses">
            {this.renderTableHeader(this.props.scheme)}
            <tbody>
              {this.renderTableRows(this.props.responses, this.props.scheme)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ResponsesTableApp.propTypes = {
  
}

const mapStateToProps = (state) => {
  return {
    scheme: state.formData.get('scheme'),
    responses: state.formData.get('responses'),
    error: state.formData.get('error'),
    modal: state.modal
  };
};

const mapDispatchToProps = {
  fetchSchemeAndResponses,
  fetchFormCSV,
  hideModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsesTableApp);