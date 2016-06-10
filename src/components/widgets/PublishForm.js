import React from 'react';
import { reduxForm } from 'redux-form';
import InputContainer from './../inputs/InputContainer';
import InputDatetime from './../inputs/InputDatetime';

const PublishForm = ({
  formId,
  fields: {
    allowRefill,
    expires,
    expireDate
  }
}) => (
  <div className='publish-method-container'>
    <blockquote>
      <p>Вы можете самостоятельно распростронить предоставленную ссылку 
      неограниченному кругу лиц.</p>
      <p>Получение ответов начнется только после отправки.</p>
    </blockquote>
    <InputContainer
      label='Адрес формы'
      field={ {} }>
      <input 
        type='text'
        className='form-control'
        value={'http://' + window.location.host + '/forms/' + formId}
        readOnly
       />
    </InputContainer>
    <div className='checkbox'>
          <label>
            <input type='checkbox' {...allowRefill}/>
            Разрешить повторное заполнение формы?
          </label>
        </div>

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
  </div>
);

export default reduxForm({
  form: 'formSending'
})(PublishForm);