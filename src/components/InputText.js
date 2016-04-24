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
    ? <label htmlFor={field.name} className='control-label'>
        {label + ( (isRequired) ? '*' : '') }
      </label>
    : null;

  return (
    <div className={ (!field.touched) ? 'form-group' : (field.invalid) ?  'form-group has-error' : 'form-group has-success'}>
      {labelNode}
      <input 
        {...field}
        type='text'
        className='form-control'
        required={isRequired} />
      {field.touched && field.error && <div className='help-block'>{field.error}</div>}
    </div>
  );

}

export default InputText;