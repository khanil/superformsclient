import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import sendRequest from '../utils/sendRequest';
import getDataFromNode from './../utils/getDataFromNode';
import ColumnGeneration from './../components/report/ColumnGeneration';
import validate from './../utils/reportValidation';

const fields = [
  'columns[].questionTitle',
  'columns[].action',
  'columns[].newTitle'
];

class ReportGeneration extends Component {

  url;

  componentWillMount() {

    // Получение адресов API к которым производятся запросы
    let data = getDataFromNode('info', [ 'postUrl']);

    if ( data.fatalError ) {
      alert('Произошла ошибка при загрузке анкеты. Пожалуйста свяжитесь с техподдержкой.')
    } else {
      this.url = data.postUrl;
    }

    // Инициализация одного поля генерации вопроса по умолчанию
    const { fields: { columns } } = this.props;
    columns.addField();

  }

  mySubmit = () => {
    // values - объект значений формы
    // url - адрес API на который отправляется форма
    const values = this.props.values;
    const url = this.url;

    const str = JSON.stringify(values, '', 2);
    console.log(str);

    sendRequest('POST', url, str, function (xhr) {
      console.log(xhr);
    })
  }

  render () {

    const {
      header,
      fields,
      hideGenerationHandler,
      handleSubmit
    } = this.props;

    const mySubmit = this.mySubmit;

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
      <form onSubmit={handleSubmit(mySubmit)}>
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
          <button type='submit' className='btn btn-default btn-primary col-xs-7'>Выполнить</button>
          <button type='button' className='btn btn-default col-xs-5' onClick={hideGenerationHandler}>Отмена</button>
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

export default reduxForm({
  form: 'reportGeneration',
  fields,
  validate
})(ReportGeneration);