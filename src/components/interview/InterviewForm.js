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
import InputContainer from './../../components/inputs/InputContainer';

class InterviewForm extends Component {

  renderQuestions() {
    const {
      fields,
      questions
    } = this.props;

    return questions.map(
      (question, index) => {
        let { title, description, type, options = null } = question;
        //Добавление нумерации вопросов
        let label = (index + 1) + '. ' + title;

        let inputNode = this.getInputByType(type, fields[title], options);

        return (
          <InputContainer
            key={index}
            field={fields[title]}
            label={label}
            description={description}
            isRequired= {true} >
            {inputNode}
          </InputContainer>
        );
    });
  }

  getInputByType(type, field, options) {
    switch (type) {
      case questionTypes.PARAGRAPH.value :
        return (
          <InputTextarea field={field} />
        );

      case questionTypes.LIST.value :
        return (
          <InputSelect field={field} options={options}/>
        );

      case questionTypes.DATE.value :
        return (
          <InputDate field={field} />
        );

      case questionTypes.TIME.value :
        return (
          <InputTime field={field} />
        );

      default :
        return (
          <InputText field={field} />
        );
    }
  }

  render() {

    const {
      fields
    } = this.props;

    return (
      <form className='formGenerator'>

        <InputContainer
          field= {fields['Автор']}
          label= {'Ваше ФИО / Наименование организации'} 
          isRequired= {true} >
          <InputText
            field= {fields['Автор']} />
        </InputContainer>

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