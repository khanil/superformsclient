/*
 * Компонент содержит поле ввода абзаца текста
 */

import React from 'react';

const InputTextarea = ({
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
      <textarea {...field} className='form-control' rows='3' />
      {field.touched && field.error && <div className='help-block'>{field.error}</div>}
    </div>
  );

}

export default InputTextarea;