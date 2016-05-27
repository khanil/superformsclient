import React from 'react';
import Header from './Header';
import QuestionsContainer from './QuestionsContainer';

const Form = ({ 
  fields: { name, description, type, questions },
  handleSubmit,
  submit,
  isSending
}) => (
  <form onSubmit={handleSubmit(submit)} method='POST' className='formGenerator'>
    <Header name={name} description={description} type={type} />
    <QuestionsContainer questions={questions} />
    <button type='submit' id='submit-btn' className='btn btn-primary btn-block'>
      {
        isSending ?
        <i className='fa fa-spinner fa-spin'></i> :
        null
      }
      Сохранить
    </button>
  </form>
);

export default Form;