/*
  Форма-опрос, которую необходимо заполнить на странице заполнения
 */

import React, { PropTypes } from 'react';
import * as questionTypes from './../../constants/questionTypes';
import InputText from './../../components/inputs/InputText';
import InputTextarea from './../../components/inputs/InputTextarea';
import InputSelect from './../../components/inputs/InputSelect';

/*
  В компонент передаются:
  Массив объектов полей формы (redux-form),
  Массив объектов с информацией о полях формы полученный с сервера,
  Функция обработчик отправки формы
 */

const Form = ({
  fields : { answers, auth },
  questions,
  handleSubmit,
  submit
}) => {

  return (

    <form onSubmit={handleSubmit(submit)} method='POST' className='formGenerator'>

      <InputText
        field= {auth}
        label= {'Ваше ФИО / Наименование организации'} 
        isRequired= {true} />

      {
        answers.map(

          (answer, index) => {

            let {
              title,
              type,
              options = null
            } = questions[index];

            title = (index + 1) + '. ' + title;

            switch (type) {

              case questionTypes.PARAGRAPH.value :
                return (
                  <InputTextarea
                    key={index}
                    field={answer}
                    label={title} 
                    isRequired= {true} />
                );

              case questionTypes.LIST.value :
                return (
                  <InputSelect
                    key={index}
                    field={answer}
                    label={title}
                    options={options} 
                    isRequired= {true} />
                );

              default :
                return (
                  <InputText
                    key={index}
                    field={answer}
                    label={title} 
                    isRequired= {true} />
                );

            }
          }
        )
      }

      <button type='submit' className='btn btn-primary btn-block'>Отправить</button>

    </form>
    
  )
}

Form.propTypes = {
  fields: PropTypes.object.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default Form;