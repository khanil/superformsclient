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
    ? <label htmlFor={field.name}>
        {label + ( (isRequired) ? '*' : '') }
      </label>
    : null;

  return (
    <div className='form-group'>
      {labelNode}
      <textarea {...field} className='form-control' rows='3' required={isRequired} />
    </div>
  );

}

export default InputTextarea;