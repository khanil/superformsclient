import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import FormHeader from '../components/FormGenerationHeader';
import QuestionsGeneration from '../components/QuestionsGeneration';
import sendRequest from '../utils/sendRequest';

const fields = [
  'name',
  'description',
  'questions[].title',
  'questions[].description',
  'questions[].type',
  'questions[].options[]'
];

const validate = (values, props) => {
  console.log(props);

  const errors = {};

  if (!values.name) {
    errors.name = 'Поле обязательно для заполнения'
  }
  else if (!/\D/g.test(values.name)) {
    errors.name = 'Недопустимый формат'
  }

  return errors;
}

class FormGeneration extends Component {

  render() {

    const { 
      fields: { name, description, questions },
      values
    } = this.props;

    const handleSubmit = (e) => {

      e.preventDefault();

      const str = JSON.stringify(values, '', 2);
      console.log(str);

      sendRequest('POST', '/api/comments', str, function (xhr) {
        console.log(xhr);
      })
      
    }

    return (
      <form onSubmit={handleSubmit} method='POST' className='formGenerator'>
        <FormHeader name={name} description={description} />
        <QuestionsGeneration questions={questions} />
        <button type='submit' className='btn btn-primary btn-block'>Сохранить</button>
      </form>
    );

  }
  
}


export default reduxForm({
  form: 'generation',
  fields,
  validate
})(FormGeneration);