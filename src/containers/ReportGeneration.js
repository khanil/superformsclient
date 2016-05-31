import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { download as downloadCSV } from './../utils/CSV';
import getDataFromNode from './../utils/getDataFromNode';
import ColumnGeneration from './../components/report/ColumnGeneration';
import validate from './../utils/reportValidation';
import { fetchReportCSV } from './../actions/actionsReport';
import { FETCH_CSV_ERROR, GET_URL_FROM_NODE_ERROR } from './../constants/errors';

const fields = [
  'columns[].questionTitle',
  'columns[].action',
  'columns[].newTitle'
];

class ReportGeneration extends Component {

  constructor(props) {
    super(props);

    this.buildReportUrl;
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentWillMount() {

    // Получение адресов API к которым производятся запросы
    let data = getDataFromNode('info', ['buildReportUrl']);

    if ( data.fatalError ) {
      alert(GET_URL_FROM_NODE_ERROR + 'buildReportUrl');
    } else {
      this.buildReportUrl = data.buildReportUrl;
    }

    // Инициализация одного поля генерации вопроса по умолчанию
    const { fields: { columns } } = this.props;
    columns.addField();

  }

  onSubmitHandler() {
    const filename = 'Отчет-' + this.props.formTitle + '.csv';

    if (this.props.needRefetch) {
      // values - объект значений формы
      // buildReportUrl - адрес API на который отправляется форма
      const values = this.props.values;
      const buildReportUrl = this.buildReportUrl;

      const settings = JSON.stringify(values, '', 2);
      console.log(settings);

      this.props.fetchReportCSVHandler(buildReportUrl, settings,
        () => ( alert(FETCH_CSV_ERROR) ),
        (csv) => ( downloadCSV(csv, filename) )
      );
    } else {
      const csv = this.props.csv;
      downloadCSV(csv, filename);
    }
  }

  render () {

    const {
      header,
      fields,
      hideGenerationHandler,
      handleSubmit,
      isFetching
    } = this.props;

    const columns = fields.columns;

    let renderColumnsGeneration = columns.map( (column, i) => (
      <ColumnGeneration
        fields={column}
        header={header}
        key={i}
        index={i}
        disabledBtn= {
          {
            up: (i === 0),
            down: (i === columns.length - 1),
            rmv: (columns.length === 1)
          }
        }
        swapUpHandler={() => {columns.swapFields(i, i - 1)}}
        swapDownHandler={() => {columns.swapFields(i, i + 1)}}
        removeHandler={() => {columns.removeField(i)}}
      />
    ));

    return (
      <form onSubmit={handleSubmit(this.onSubmitHandler)}>
        <div className='report-generation-container'>
          <table className='table'>
            <thead>
              <tr>
                <th>#</th>
                <th>Поле</th>
                <th>Операция</th>
                <th>Название</th>
                <th className='th-btn'></th>
              </tr>
            </thead>
            <tbody>
              { renderColumnsGeneration }
            </tbody>
          </table>

          <div className='form-group'>
            <button type='button' className='btn btn-default pull-right' onClick={() => {fields.columns.addField()}}>
              <span class='glyphicon glyphicon-plus' aria-hidden='true'></span> Добавить
            </button>
            <div className='clearfix'></div>
          </div>
        </div>

        <div className='form-group'>
          <button type='submit' className='btn btn-default btn-primary col-xs-7'>
            {
              isFetching
              ? <i className='fa fa-spinner fa-spin'></i>
              : null
            }
            Выполнить
          </button>
          <button type='button' className='btn btn-default col-xs-5'
            onClick={hideGenerationHandler}>
            Отмена
          </button>
        </div>
      </form>

    );
  }
}

ReportGeneration.propTypes = {
  fields: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hideGenerationHandler: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.report.isFetching,
    csv: state.report.csv,
    error: state.report.error,
    needRefetch: state.report.needRefetch,
    formTitle: state.table.boilerplate.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchReportCSVHandler : (url, settings, onErrorFn, onSuccessFn) => {
      dispatch( fetchReportCSV(url, settings, onErrorFn, onSuccessFn) );
    }
  }
};

export default reduxForm({
  form: 'reportGeneration',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps)(ReportGeneration);