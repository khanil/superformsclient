/*
 * Компонент содержит выбор из списка
 */

import React from 'react';

const InputSelect = ({
  field,
  label,
  isRequired = false,
  options
}) => {

  const labelNode = label
    ? <label htmlFor={field.name}>
        {label + ( (isRequired) ? '*' : '') }
      </label>
    : null;

  return (
    <div className='form-group'>
      {labelNode}
      <select 
        {...field}
        className='form-control'
        required={isRequired} >

        <option/>

        {
          options.map((option, index) => (
            <option key={index}>
              {option}
            </option>
          ))
        }

      </select>
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