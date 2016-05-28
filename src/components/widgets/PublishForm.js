import React from 'react';
import InputContainer from './../inputs/InputContainer';

const PublishForm = ({
  formId
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
  </div>
);

export default PublishForm;