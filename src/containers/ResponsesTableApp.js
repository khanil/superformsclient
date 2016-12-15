import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';
import { FormInfo, ControlPanel } from '../components/ResponsesTable';
import { bindFunctions } from '../utils';
import { formTypes } from '../constants';
import * as responsesTable from '../redux/modules/responsesTable';

import Moment from 'moment';
Moment.locale('ru');
const formatDate = 'DD/MM/YY';
const formatTime = 'HH:mm:ss';

const UPDATE_RESPONSES_TIMEOUT = 300000;

export default class ResponsesTableApp extends AppComponent {
  constructor(props) {
    super(props);

    bindFunctions.call(this,
      [
        'pushSection',
        'refreshResponses',
        'renderTableHeader',
        'renderTableRow',
        'renderTableRows',
        'rowClickHandler',
      ]
    );
  }

  componentWillMount() {
    const myRegexp = /forms\/(.+)\//g;
    const match = myRegexp.exec(document.location.pathname);
    this.formId = match[1];

    this.props.fetchForm(this.formId);
    this.props.fetchResponses(this.formId);

    this.refreshTimer = setTimeout(this.refreshResponses, UPDATE_RESPONSES_TIMEOUT);
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  pushSection(length, text, key) {
    return <th key={key} colSpan={length} style={{textAlign: 'center', verticalAlign: 'middle'}}>{text}</th>
  }

  refreshResponses() {
    this.props.fetchResponses(this.formId);

    this.refreshTimer = setTimeout(this.refreshResponses, UPDATE_RESPONSES_TIMEOUT);
  }

  renderTableHeader(scheme) {
    const header = [<th key={0}>#</th>, <th key={1}>Дата</th>];
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
      const description = item.get('description');

      const descTip = description ?
        <span
          className='glyphicon glyphicon-info-sign th-tip'
          aria-hidden='true'
          title={description}
        ></span> :
        null;

      sLength++;

      return (
        <th key={i + 2}>
          <span className='th-title'>{title}</span>
          {descTip}
        </th>
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

    return responses.reverse().map((response, i) => (
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
      let text = answer;

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

  render() {
    if (this.props.scheme === undefined || this.props.responses === undefined)
      return null;

    /*TODO: привести в порядок*/
    const title = this.props.scheme.get('title');
    const description = this.props.scheme.get('description');
    let type = this.props.scheme.get('type');
    type = type ? formTypes[type.toUpperCase()].label : null;
    const basis = this.props.scheme.get('basis');
    const basisname = this.props.scheme.get('basisname');

    const {
      fetchResponses,
      fetchXLSX,
      updating
    } = this.props;

    const updated = Moment(this.props.updated).format(formatTime);

    return (
      <div className='form-responses'>
        <FormInfo
          title={title}
          description={description}
          type={type}
          basis={basis}
          basisname={basisname}
        />

        <ControlPanel
          updating={updating}
          updated={updated}
          fetchResponses={fetchResponses.bind(null, this.formId)}
          fetchXLSX={fetchXLSX.bind(null, this.formId)}
        />
        
        {/*TODO: вынести в отдельный компонент*/}
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

const mapStateToProps = (state) => {
  const rT = state.responsesTable;
  return {
    scheme: responsesTable.getScheme(rT),
    responses: responsesTable.getResponses(rT),
    updated: responsesTable.getLastUpdateTime(rT),
    updating: responsesTable.isUpdating(rT)
  };
};

const mapDispatchToProps = {
  fetchForm: responsesTable.fetchForm,
  fetchResponses: responsesTable.fetchResponses,
  fetchXLSX: responsesTable.fetchXLSX
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsesTableApp);