import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import InputContainer from './../inputs/InputContainer';
import InputText from './../inputs/InputText';
import InputTextarea from './../inputs/InputTextarea';
import InputDatetime from './../inputs/InputDatetime';
import validate from './../../utils/sendFormValidation';

class SendForm extends Component {

  render() {

    const {
      fields: {
        topic,
        message,
        recipients,
        expires,
        expireDate
      }
    } = this.props;

    return (
      <form  method='POST' role='form'>

        <InputContainer
          label='Адреса электронной почты получателей'
          field={recipients}
          description='Введите адреса e-mail через запятую'
          isRequired={true}>
          <InputTextarea field={recipients}/>
        </InputContainer>

        <blockquote>
          <p>Вы можете указать тему рассылки и сообщение письма.</p>
        </blockquote>

        <InputContainer
          label='Тема'
          field={topic}>
          <InputText field={topic}/>
        </InputContainer>

        <InputContainer
          label='Сообщение'
          field={message}>
          <InputTextarea field={message}/>
        </InputContainer>

        <div className='checkbox'>
          <label>
            <input type='checkbox' {...expires}/>
            Ограничить срок приема ответов?
          </label>
        </div>

        {
          expires.value
          ? <InputContainer
            label='Дата окончания приема ответов'
            field={expireDate}>
            <InputDatetime
              field={expireDate}
              min={new Date()}/>
            </InputContainer>
          : null
        }
        
      </form>
    );
  }
}

export default reduxForm({
  form: 'formSending',
  validate
})(SendForm);