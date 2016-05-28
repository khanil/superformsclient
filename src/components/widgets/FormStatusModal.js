import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import InputContainer from './../inputs/InputContainer';

class FormStatusModal extends Component {

  render() {

    const {
      hideHandler,
      formId
    } = this.props;

    return (
      <Modal show={true} onHide={hideHandler} className='status-form-modal'>
        <Modal.Header>
          <Modal.Title>Статус формы</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='status-modal-container'>
            <blockquote>
              <p>Вы можете самостоятельно распростронить предоставленную ссылку 
              неограниченному кругу лиц.</p>
            </blockquote>
            <InputContainer
              label='Адрес формы'
              field={ {} }>
              <input 
                type='text'
                className='form-control'
                value={'http://' + window.location.host + '/forms/' + formId}
                readOnly
               />
            </InputContainer>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button type='button' className='btn btn-default' onClick={() => {hideHandler(null)}}>
            Закрыть
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

FormStatusModal.propTypes = {
  hideHandler: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    formId: state.statusModal.formId
  }
}

export default connect(
  mapStateToProps
)(FormStatusModal);