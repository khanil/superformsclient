import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const ControlButtons = ({
  disabledBtns,
  removeHandler,
  swapUpHandler,
  swapDownHandler,
  addCopyHandler
}) => (

  <div className='btn-group question-config-btn pull-right' role='group' aria-label='...'>

    <OverlayTrigger
      placement='top'
      overlay={<Tooltip>Переместить вверх</Tooltip>}
    >
      <button 
        type='button' 
        className='btn btn-default'
        disabled={(disabledBtns.up) ? 'disabled' : null}
        onClick={swapUpHandler} >
        <span className='glyphicon glyphicon-arrow-up' aria-hidden='true'></span>
      </button>
    </OverlayTrigger>

    <OverlayTrigger
      placement='top'
      overlay={<Tooltip>Переместить вниз</Tooltip>}
    >
      <button 
        type='button' 
        className='btn btn-default'
        disabled={(disabledBtns.down) ? 'disabled' : null}
        onClick={swapDownHandler} >
        <span className='glyphicon glyphicon-arrow-down' aria-hidden='true'></span>
      </button>
    </OverlayTrigger>

    <OverlayTrigger
      placement='top'
      overlay={<Tooltip>Скопировать</Tooltip>}
    >
      <button 
        type='button' 
        className='btn btn-default'
        onClick={addCopyHandler}
       >
        <span className='glyphicon glyphicon-duplicate' aria-hidden='true'></span>
      </button>
    </OverlayTrigger>

    <OverlayTrigger
      placement='top'
      overlay={<Tooltip>Удалить</Tooltip>}
    >
      <button 
        type='button' 
        className='btn btn-default'
        disabled={(disabledBtns.remove) ? 'disabled' : null}
        onClick={removeHandler} >
        <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
      </button>
    </OverlayTrigger>

  </div>

);

export default ControlButtons;