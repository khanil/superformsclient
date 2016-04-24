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
        className='form-control'
        required={isRequired} >

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

{/*<div className='form-group'>
            <label>Тип ответа</label> 
            <select name={this.props.idd+'[questionType]'} 
              className='form-control' 
              required='required' 
              defaultValue='string'
              onChange={this.changeHandler}>
              <option value='string'>Строка</option>
              <option value='paragraph'>Абзац</option>
              <option value='datetime'>Дата/Время</option>
              <option value='select'>Выбор из списка</option>
            </select>
          </div>*/}