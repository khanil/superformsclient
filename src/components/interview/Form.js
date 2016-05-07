/*
  Форма-опрос, которую необходимо заполнить на странице заполнения
 */

import React, { PropTypes } from 'react';
import * as questionTypes from './../../constants/questionTypes';
import InputText from './../../components/inputs/InputText';
import InputTextarea from './../../components/inputs/InputTextarea';
import InputSelect from './../../components/inputs/InputSelect';
import InputDate from './../../components/inputs/InputDate';
import InputTime from './../../components/inputs/InputTime';

/*
  В компонент передаются:
  Массив объектов полей формы (redux-form),
  Массив объектов с информацией о полях формы полученный с сервера,
  Функция обработчик отправки формы
 */

const Form = ({
  fields,
  questions,
  handleSubmit,
  submit
}) => {

  const renderQuestions = () => (
    questions.map(
      (question, index) => {

        let { title, type, options = null } = question;

        //Добавление нумерации вопросов
        let label = (index + 1) + '. ' + title;

        switch (type) {

          case questionTypes.PARAGRAPH.value :
            return (
              <InputTextarea
                key={index}
                field={fields[title]}
                label={label} 
                isRequired= {true} />
            );

          case questionTypes.LIST.value :
            return (
              <InputSelect
                key={index}
                field={fields[title]}
                label={label}
                options={options} 
                isRequired= {true} />
            );

          case questionTypes.DATE.value :
            return (
              <InputDate
                key={index}
                field={fields[title]}
                label={label}
                isRequired={true} />
            );

          case questionTypes.TIME.value :
            return (
              <InputTime
                key={index}
                field={fields[title]}
                label={label}
                isRequired={true} />
            );

          default :
            return (
              <InputText
                key={index}
                field={fields[title]}
                label={label} 
                isRequired= {true} />
            );

        }
      }
    )
  )

  return (

    <form onSubmit={handleSubmit(submit)} method='POST' className='formGenerator'>

      <InputText
        field= {fields['Автор']}
        label= {'Ваше ФИО / Наименование организации'} 
        isRequired= {true} />

      {renderQuestions()}

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