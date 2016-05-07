import React, {PropTypes} from 'react';
import { Modal } from 'react-bootstrap';

const MessageModal = ({
  children,
  hideHandler
}) => (
  <Modal show={true} onHide={hideHandler} className='message-modal'>
    <Modal.Header>
      <Modal.Title></Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {children}
    </Modal.Body>

    <Modal.Footer>
      <button type='button' className='btn btn-default' onClick={() => {hideHandler(null)}}>Закрыть</button>
    </Modal.Footer>
  </Modal>
);

MessageModal.propTypes = {
  hideHandler: PropTypes.func.isRequired
}