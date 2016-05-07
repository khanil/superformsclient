import React, {PropTypes} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

const MultyPurposeButtons = ({
  children,
  openCopyModal,
  openDeleteModal
}) => (
  <div className='btn-group operations-btns'>
    {children}

    <OverlayTrigger
      placement='top'
      overlay={<Tooltip>Копировать</Tooltip>}
    >
      <button
        type='button'
        className='btn btn-default'
        onClick={openCopyModal}
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
        onClick={openDeleteModal}
      >
        <span className='glyphicon glyphicon-trash' aria-hidden='true'></span>
      </button>
    </OverlayTrigger>
  </div>
);

MultyPurposeButtons.propTypes = {
  openCopyModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired
}

export default MultyPurposeButtons;