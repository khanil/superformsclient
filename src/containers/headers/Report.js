import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTableCSV } from './../../actions/actionsReport';
import getDataFromNode from './../../utils/getDataFromNode';
import { download as downloadCSV } from './../../utils/CSV';
import { FETCH_CSV_ERROR, GET_URL_FROM_NODE_ERROR } from './../../constants/errors';

import Moment from 'moment';
Moment.locale('ru');
const format = 'DD/MM/YY HH:mm';

class ReportHeader extends Component {

  constructor(props) {
    super(props);

    this.buildCSVUrl;
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentWillMount() {

    let data = getDataFromNode('info', ['buildCSVUrl']);

    if ( data.fatalError ) {
      alert(GET_URL_FROM_NODE_ERROR + 'buildCSVUrl');
    } else {
      this.buildCSVUrl = data.buildCSVUrl;
      this.props.fetchTableCSVHandler(this.buildCSVUrl);
    }

  }

  onClickHandler() {
    if (this.props.error) {
      this.props.fetchTableCSVHandler(this.buildCSVUrl,
        () => {
          alert(FETCH_CSV_ERROR);
        }
      );
    } else {
      const filename = this.props.title + '.csv';
      const csv = this.props.csv;
      downloadCSV(csv, filename);
    }
  }

  render() {
    const {
      sent,
      expires,
      hasAnswers,
      isFetching
    } = this.props;

    return (
      <div className='row'>
        <div className='col-md-8 page-header-info'>
          <p>{'Отправлено: ' + Moment(sent).format(format)}</p>
          {
            expires ?
            <p>{'Окончание: ' + Moment(expires).format(format)}</p> :
            null
          }
        </div>
        <div className='col-md-4 page-header-btns'>
          <button
            type='button'
            className='btn btn-success pull-right'
            disabled={hasAnswers ? null : 'disabled'}
            onClick={this.onClickHandler}>
            {
              isFetching
              ? <i className='fa fa-spinner fa-spin'></i>
              : null
            }
            <span>Выгрузить в CSV</span>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.table.boilerplate.name,
    sent: state.table.boilerplate.sent,
    expires: state.table.boilerplate.expires,
    hasAnswers: (state.table.answers.length > 0),
    isFetching: state.csv.isFetching,
    csv: state.csv.content,
    error: state.csv.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTableCSVHandler : (url, onErrorFn) => {
      dispatch( fetchTableCSV(url, onErrorFn) );
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportHeader);