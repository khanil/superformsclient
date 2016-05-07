import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import sendRequest from '../utils/sendRequest';
import getDataFromNode from './../utils/getDataFromNode';
import validate from './../utils/generationValidation';
import { LIST } from './../constants/questionTypes';
import Form from './../components/generation/Form';

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
    const { fields: { questions } } = this.props;
    questions.addField();

  }

  mySubmit = () => {
    // values - объект значений формы
    // url - адрес API на который отправляется форма
    const values = this.props.values;
    const url = this.url;

    /*
      TODO: Перенести на сервер ???
      Удаляет пустые поля options перед отправкой
     */
    values.questions.forEach( (question) => {
      if (question.type !== LIST.value) {
        delete question.options;
      }
    });

    const str = JSON.stringify(values, '', 2);
    console.log(str);

    sendRequest('POST', url, str, function (xhr) {
      console.log(xhr);
    })
  }

  render() {

    const { 
      fields,
      handleSubmit
    } = this.props;

    const mySubmit = this.mySubmit;

    return (

      <Form
        fields= {fields}
        handleSubmit= {handleSubmit}
        submit= {mySubmit} />

    );

  }
  
}

export default reduxForm({
  form: 'generation',
  fields,
  validate
})(FormGeneration);