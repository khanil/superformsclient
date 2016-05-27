import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
// import Form from './../components/interview/Form';
import validate from './../../utils/interviewValidation';

import * as questionTypes from './../../constants/questionTypes';
import InputText from './../../components/inputs/InputText';
import InputTextarea from './../../components/inputs/InputTextarea';
import InputSelect from './../../components/inputs/InputSelect';
import InputDate from './../../components/inputs/InputDate';
import InputTime from './../../components/inputs/InputTime';

class InterviewForm extends Component {

  renderQuestions = () => {
    const {
      fields,
      questions
    } = this.props;

    return questions.map(
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
  };

  render() {

    const {
      fields
    } = this.props;

    return (
      <form className='formGenerator'>

        <InputText
          field= {fields['Автор']}
          label= {'Ваше ФИО / Наименование организации'} 
          isRequired= {true} />

        {this.renderQuestions()}

      </form>
    );

  }

}

export default reduxForm({
  form: 'interview',
  touchOnChange: true,
  validate
})(InterviewForm);