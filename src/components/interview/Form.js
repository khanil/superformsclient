/*
  Форма-опрос, которую необходимо заполнить на странице заполнения
 */

import React, { PropTypes } from 'react';
import { PARAGRAPH, SELECT } from './../../constants/questionTypes';
import InputText from './../../components/InputText';
import InputTextarea from './../../components/InputTextarea';
import InputSelect from './../../components/InputSelect';

/*
  В компонент передаются:
  Массив объектов полей формы (redux-form),
  Массив объектов с информацией о полях формы полученный с сервера,
  Функция обработчик отправки формы
 */

const Form = ({
  fields : { answers, auth},
  questions,
  handleSubmit
}) => {

  return (

    <form onSubmit={handleSubmit} method='POST' className='formGenerator'>

      <InputText
        field= {auth}
        label= {'Ваше ФИО / Наименование организации'}
        isRequired= {true} />

      {
        answers.map(

          (answer, index) => {

            let {
              title,
              required = true,
              type,
              options = null
            } = questions[index];

            switch (type) {

              case PARAGRAPH :
                return (
                  <InputTextarea
                    key={index}
                    field={answer}
                    label={title}
                    isRequired={required ? 'true' : null} />
                );

              case SELECT :
                return (
                  <InputSelect
                    key={index}
                    field={answer}
                    label={title}
                    options={options}
                    isRequired={required ? 'true' : null} />
                );

              default :
                return (
                  <InputText
                    key={index}
                    field={answer}
                    label={title}
                    isRequired={required ? 'true' : null} />
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