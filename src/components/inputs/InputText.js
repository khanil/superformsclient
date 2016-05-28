/*
 * Компонент содержит поле ввода строки текста
 */

import React from 'react';

const InputText = ({
  field
}) => (
  <input 
    {...field}
    type='text'
    className='form-control' />
);

export default InputText;