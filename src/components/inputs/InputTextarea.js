/*
 * Компонент содержит поле ввода абзаца текста
 */

import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

const InputTextarea = ({
  field,
  label,
  tip = null,
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

        {
          tip ?
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip>{tip}</Tooltip>}
          >
            <textarea {...field} className='form-control' rows='3' />
          </OverlayTrigger> :
          <textarea {...field} className='form-control' rows='3' />
        }
        
        {field.touched && field.error && <div className='help-block'>{field.error}</div>}
      </div>
  );

}

export default InputTextarea;