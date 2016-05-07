import React, {PropTypes} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

const FormButtons = ({
  showSendModal,
  editForm
}) => (
  <div className='btn-group'>

    <OverlayTrigger
      placement='top'
      overlay={<Tooltip>Отправить</Tooltip>}
    >
      <button
        type='button'
        className='btn btn-default'
        onClick={showSendModal}
      >
        <span className='glyphicon glyphicon-send' aria-hidden='true'></span>
      </button>
    </OverlayTrigger>

    <OverlayTrigger
      placement='top'
      overlay={<Tooltip>Редактировать</Tooltip>}
    >
      <button
        type='button'
        className='btn btn-default'
        onClick={editForm}
      >
        <span className='glyphicon glyphicon-pencil' aria-hidden='true'></span>
      </button>
    </OverlayTrigger>
  </div>
);

FormButtons.propTypes = {
  showSendModal: PropTypes.func.isRequired,
  editForm: PropTypes.func.isRequired
}

export default FormButtons;