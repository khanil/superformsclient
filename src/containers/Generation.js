import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import getDataFromNode from './../utils/getDataFromNode';
import validate from './../utils/generationValidation';
import { LIST } from './../constants/questionTypes';
import Form from './../components/generation/Form';
import { sendBoilerplate, fetchBoilerplate, setPageType, readUrlsFromHtml } from './../actions/actionsGeneration';
import { EDIT_FORM } from './../constants/generationPageTypes';//CREATE_FORM, 
import LoadingSpinner from './../components/widgets/LoadingSpinner';

const fields = [
  'name',
  'description',
  'type',
  'questions[].title',
  'questions[].description',
  'questions[].type',
  'questions[].options[]'
];

class FormGeneration extends Component {

  /*
    URL на который отправляется результат заполнения формы считывается из
    разметки, в элементе с id 'info'
   */
  urls;

  componentWillMount() {

    // Получение адресов API к которым производятся запросы
    let data = getDataFromNode('info', 'ALL');

    if ( data.fatalError ) {
      alert('Произошла ошибка при получении данных из разметки. Пожалуйста свяжитесь с техподдержкой.')
    } else {

      this.props.setPageTypeHandler(data.type);

      this.props.readUrlsFromHtmlHandler(data);

      this.urls = data;

      if (data.type === EDIT_FORM) {
        const getUrl = data.getUrl;

        if ( getUrl === undefined) {
          alert('Произошла ошибка при получении данных из разметки. Пожалуйста свяжитесь с техподдержкой.')
        } else {
          //Запрос существующего шаблона данной формы с сервера
          this.props.fetchBoilerplateHandler(getUrl);
        }
      }
    }

  }

  mySubmit = () => {
    // values - объект значений формы
    // url - адрес API на который отправляется форма
    const values = this.props.values;
    const urls = this.urls;
    /*
      TODO: Перенести на сервер ???
      Удаляет пустые поля options перед отправкой
     */
    values.questions.forEach( (question) => {
      if (question.type !== LIST.value) {
        delete question.options;
      }
    });

    //Когда у формы появляется id (сохраняется хотя бы один раз),
    //данные отправляются на другой api
    const url = (this.props.hasId) ?
                urls.updateUrl.replace('id', this.props.formId) :
                urls.createUrl;


    this.props.sendBoilerplateHandler(url, values);
  }

  render() {

    const { 
      fields,
      handleSubmit,
      isFetching,
      isSending
    } = this.props;

    const mySubmit = this.mySubmit;

    return (
      <div>
        {
          isFetching ?
          <LoadingSpinner /> :
          <Form
            fields= {fields}
            handleSubmit= {handleSubmit}
            submit= {mySubmit}
            isSending={isSending}
          />
        }
      </div>
    );

  }
  
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.page.isFetching,
    initialValues: state.boilerplate,
    isSending: state.page.isSending,
    hasId: (state.boilerplate.id !== undefined),
    formId: state.boilerplate.id
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendBoilerplateHandler: (url, boilerplate) => {
      dispatch( sendBoilerplate(url, boilerplate) );
    },
    fetchBoilerplateHandler: (url) => {
      dispatch( fetchBoilerplate(url) );
    },
    setPageTypeHandler: (type) => {
      dispatch( setPageType(type) );
    },
    readUrlsFromHtmlHandler: (urls) => {
      dispatch( readUrlsFromHtml(urls) );
    }
  }
}

export default reduxForm({
  form: 'generation',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps)(FormGeneration);