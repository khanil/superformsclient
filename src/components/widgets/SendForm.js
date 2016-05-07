import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
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

        <InputTextarea
          label='Адреса электронной почты получателей'
          field={recipients}
          tip='Введите адреса e-mail через запятую'
          isRequired={true}
        />

        <blockquote>
          <p>Вы можете указать тему рассылки и сообщение письма.</p>
        </blockquote>

        <InputText
          label='Тема'
          field={topic}
        />

        <InputTextarea
          label='Сообщение'
          field={message}
        />

        <div className='checkbox'>
          <label>
            <input type='checkbox' {...expires}/>
            Ограничить срок приема ответов?
          </label>
        </div>

        {
          expires.value ?
          <InputDatetime
            label='Дата окончания приема ответов'
            field={expireDate}
            min={new Date()}
          /> :
          null
        }
        
      </form>
    );
  }
}

export default reduxForm({
  form: 'formSending',
  validate
})(SendForm);