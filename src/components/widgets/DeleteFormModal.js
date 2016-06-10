import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { deleteForm, deleteSuccess, deleteFailed } from './../../actions/actionsDeleteModal';

import sendRequest from './../../utils/sendRequest';

class DeleteFormModal extends Component {

  mySubmit = () => {
    this.props.deleteFormHandler();

    const id = this.props.formId;

    const adds = this.props.url.replace('id', id);

    sendRequest('DELETE', adds, null, this.props.deleteSuccessHandler, this.props.deleteFailHandler);
  }

  render() {

    const {
      isDeleted,
      isDeleting,
      deleteError,
      hideHandler
    } = this.props;

    const mySubmit = this.mySubmit;

    return (
      <Modal show={true} onHide={hideHandler} className='delete-form-modal'>
        <Modal.Header>
          <Modal.Title>Удаление формы</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {
            isDeleted ?
            <div className='alert alert-success' role='alert'>
              <b>Успех!</b> Форма успешно удалена
            </div> :
            deleteError ?
            <div className='alert alert-danger' role='alert'>
              <b>Ошибка!</b> {deleteError}
            </div> :
            null
          }

          {
            (isDeleted || deleteError) ?
            null :
            <div className='alert alert-danger' role='alert'>
              <p><b>Внимание!</b></p>
              <p>Нажав на кнопку &laquo;Удалить&raquo;, вы безвозвратно <b>потеряете все ответы</b> и <b>отчеты</b>, связанные с данной формой.</p>
              <p>Производите удаление, только если уверены в своих действиях.</p>
            </div>
          }
        </Modal.Body>

        <Modal.Footer>
          { 
            (isDeleted || deleteError) ?
            null :
            <button type='button' className='btn btn-default btn-danger' onClick={mySubmit}>
              {
                isDeleting ?
                <i className='fa fa-spinner fa-spin'></i> :
                null
              }
              Удалить
            </button>
          }
          <button type='button' className='btn btn-default btn-primary' onClick={() => {hideHandler(null)}}>
            {
              (isDeleted || deleteError) ?
              'Закрыть' :
              'Отмена'
            }
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

DeleteFormModal.propTypes = {
  hideHandler: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  successFunc: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    formId: state.deleteModal.formId,
    isDeleted: state.deleteModal.isDeleted,
    isDeleting: state.deleteModal.isDeleting,
    deleteError: state.deleteModal.deleteError
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteFormHandler: () => {
      dispatch( deleteForm() )
    },
    deleteSuccessHandler: () => {
      dispatch( deleteSuccess() );
      ownProps.successFunc();
    },
    deleteFailHandler: (error) => {
      dispatch( deleteFailed(error) )
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteFormModal);