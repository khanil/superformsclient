/*
 * Компонент содержит выбор из списка
 */

import React from 'react';

const InputSelect = ({
  field,
  /*
    options - [] of string
            - [] of {value: string, label: string }
   */
  options
}) => (
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
);

export default InputSelect;