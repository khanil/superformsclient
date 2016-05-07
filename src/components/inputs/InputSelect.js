/*
 * Компонент содержит выбор из списка
 */

import React from 'react';

const InputSelect = ({
  field,
  label,
  isRequired = false,
  /*
    options - [] of string
            - [] of {value: string, label: string }
   */
  options
}) => {

  const labelNode = label
    ? <label htmlFor={field.name} className='control-label'>
        {label + ( (isRequired) ? '*' : '') }
      </label>
    : null;

  return (
    <div className={ (!field.touched) ? 'form-group' : (field.invalid) ?  'form-group has-error' : 'form-group has-success'}>
      {labelNode}
      <select 
        {...field}
        className='form-control' >

        <option/>

        {
          options.map((option, index) => {
            let value, label;

            if (typeof option === 'object') {
              value = option.value;
              label = option.label;
            } else {
              value=label=option;
            }

            return ( 
              <option key={index} value={value}>
                {label}
              </option>
            );
          })
        }

      </select>
      {field.touched && field.error && <div className='help-block'>{field.error}</div>}
    </div>
  );

}

export default InputSelect;