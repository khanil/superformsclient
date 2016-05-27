import React from 'react';
import Question from './Question';

const QuestionsContainer = ({
  questions
}) => (
  <div className='questionList'>

  {
    questions.map((question, index, questions) => {
      let questionValues = {
        title: question.title.value,
        description: question.description.value,
        type: question.type.value,
        options: question.options.map( (option) => (option.value) )
      }

      return (
        <Question
          key={index}
          index={index}
          field={question}
          disabledBtns= {
            {
              remove: (questions.length === 1),
              up: (index === 0),
              down: (index === questions.length - 1)
            }
          }
          removeHandler={ () => { questions.removeField(index) } }
          swapUpHandler={ () => { questions.swapFields(index, index - 1) } }
          swapDownHandler={ () => { questions.swapFields(index, index + 1) } }
          addCopyHandler={ () => { questions.addField( questionValues ,index + 1) } }
        />
    )})
  }

    <div className='form-group'>
      <button type='button' className='btn btn-default questionListButton' onClick={() => { questions.addField() }} >
        Добавить вопрос
      </button>
    </div>
  </div>
);

export default QuestionsContainer;