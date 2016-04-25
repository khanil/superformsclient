import React from 'react';
import Header from './Header';
import QuestionsContainer from './QuestionsContainer';

const Form = ({ 
  fields: { name, description, questions },
  handleSubmit,
  submit
}) => (
  <form onSubmit={handleSubmit(submit)} method='POST' className='formGenerator'>
    <Header name={name} description={description} />
    <QuestionsContainer questions={questions} />
    <button type='submit' className='btn btn-primary btn-block'>Сохранить</button>
  </form>
);

export default Form;