/*
 * Компонент содержит поле ввода варианта ответа при конфигурации вопроса
 * предполагающего выбор ответа из списка
 */

import React from 'react';

const InputOption = ({
  field,
  label,
  removeHandler
}) => {

  // const labelNode = label
  //   ? <label 
  //       htmlFor={field.name}
  //       className='col-sm-2 control-label'>
  //       {label}
  //     </label>
  //   : null;

  return (
    <div className='form-group'>
      <div className='input-group'>
        <span className='input-group-addon'>{label}</span>
        <input {...field} type='text' className='form-control' />
        <span className='input-group-btn'>
          <button className='btn btn-default' type='button' onClick={removeHandler}>
            <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
          </button>
        </span>
      </div>
    </div>
  );

}

export default InputOption;