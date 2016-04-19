/*
 * Компонент содержит поле ввода строки текста
 */

import React from 'react';

const InputText = ({
  field,
  label,
  isRequired = false
}) => {

  const labelNode = label
    ? <label htmlFor={field.name}>
        {label + ( (isRequired) ? '*' : '') }
      </label>
    : null;

  return (
    <div className='form-group'>
      {labelNode}
      <input {...field}
      type='text' className='form-control' required={isRequired} />
      {field.touched && field.error && <div>{field.error}</div>}
    </div>
  );

}

export default InputText;