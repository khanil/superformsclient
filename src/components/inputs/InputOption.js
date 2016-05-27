/*
 * Компонент содержит поле ввода варианта ответа при конфигурации вопроса
 * предполагающего выбор ответа из списка
 */

import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const InputOption = ({
  field,
  label,
  removeHandler
}) => {

  return (
    <div className='input-group option-input'>
      <span className='input-group-addon'>{label}</span>
      <input {...field} type='text' className='form-control' />
      <span className='input-group-btn'>
        <OverlayTrigger
          placement='top'
          overlay={<Tooltip>Удалить вариант</Tooltip>}
        >
          <button className='btn btn-default' type='button' onClick={removeHandler}>
            <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
          </button>
        </OverlayTrigger>
      </span>
    </div>
  );

}

export default InputOption;