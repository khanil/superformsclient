import React, {PropTypes} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

const SentFormButtons = ({
  showStatus,
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
        onClick={showStatus}
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
  showStatus: PropTypes.func.isRequired,
  openAnswersPage: PropTypes.func.isRequired
};

export default SentFormButtons;