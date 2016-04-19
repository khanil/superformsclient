import React from 'react';
import Question from './Question';

const QuestionsGeneration = ({
  questions
}) => (
  <div className='questionList'>

  {
    questions.map((question, index, questions) => {

      return (
      <Question
        key={index}
        field={question}
        disabledBtn= {
          {
            up: (index === 0),
            down: (index === questions.length - 1)
          }
        }
        removeHandler={() => {questions.removeField(index)}}
        swapUpHandler={() => {
          questions.swapFields(index, index - 1)}}
        swapDownHandler={() => {questions.swapFields(index, index + 1)}}/>
    )})
  }

    <div className='form-group'>
      <button type='button' className='btn btn-default questionListButton' onClick={() => { questions.addField() }} >Добавить вопрос</button>
    </div>
  </div>
);

export default QuestionsGeneration;