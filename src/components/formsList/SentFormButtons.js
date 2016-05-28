import React, {PropTypes} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

const SentFormButtons = ({
  showStatusModal,
  openAnswersPage
}) => (
  <div className='btn-group'>

    <OverlayTrigger
      placement='top'
      overlay={<Tooltip>Ход мониторинга</Tooltip>}
    >
      <button
        type='button'
        className='btn btn-default'
        onClick={showStatusModal}
      >
        <span className='glyphicon glyphicon-stats' aria-hidden='true'></span>
      </button>
    </OverlayTrigger>

    <OverlayTrigger
      placement='top'
      overlay={<Tooltip>Просмотр ответов</Tooltip>}
    >
      <button
        type='button'
        className='btn btn-default'
        onClick={openAnswersPage}
      >
        <span className='glyphicon glyphicon-list-alt' aria-hidden='true'></span>
      </button>
    </OverlayTrigger>
  </div>
);

SentFormButtons.propTypes = {
  showStatusModal: PropTypes.func.isRequired,
  openAnswersPage: PropTypes.func.isRequired
};

export default SentFormButtons;