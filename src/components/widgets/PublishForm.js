import React from 'react';

const PublishForm = ({
  formId
}) => (
  <div className='publish-method-container'>
    <blockquote>
      <p>Вы можете самостоятельно распростронить предоставленную ссылку 
      неограниченному кругу лиц.</p>
      <p>Получение ответов начнется только после отправки.</p>
    </blockquote>
    <div className='form-group'>
      <label>
        Адрес формы
      </label>
      <input 
        type='text'
        className='form-control'
        value={'http://' + window.location.host + '/forms/' + formId}
        readOnly
       />
    </div>
  </div>
);

export default PublishForm;