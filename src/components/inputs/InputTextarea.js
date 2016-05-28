/*
 * Компонент содержит поле ввода абзаца текста
 */

import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

const InputTextarea = ({
  field,
  tip = null
}) => (
  <div>
    {
      tip
      ? <OverlayTrigger
        placement='top'
        overlay={<Tooltip>{tip}</Tooltip>}
      >
        <textarea {...field} className='form-control' rows='3' />
      </OverlayTrigger>
      : <textarea {...field} className='form-control' rows='3' />
    }
  </div>
);

export default InputTextarea;