import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import InputContainer from './../inputs/InputContainer';
import InputText from './../inputs/InputText';
import { Modal } from 'react-bootstrap';
import { EMPTY } from './../../labels/validationErrors';
import { copyForm, copySuccess, copyFailed } from './../../actions/actionsCopyModal';
import sendRequest from './../../utils/sendRequest';
// import {getValues} from 'redux-form';

const fields = [
  'name'
];

const isEmpty = (value) => (
  value === undefined || value === null || value === ''
);

const validate = ({ name }) => {
  const errors = {};

  if (isEmpty(name)) {
    errors.name = EMPTY;
  }

  return errors;
}

class CopyFormModal extends Component {

  mySubmit = () => {
    this.props.copyFormHandler();
    const id = this.props.formId;

    let values = this.props.values;
    values.id = id;

    const str = JSON.stringify(values, '', 2);

    const adds = this.props.url.replace('id', id);

    sendRequest('POST', adds, str, this.props.copySuccessHandler, this.props.copyFailHandler);
  }

  render() {

    const {
      fields: {
        name
      },
      isCopied,
      isCopying,
      copyError,
      hideHandler,
      handleSubmit
    } = this.props;

    const mySubmit = this.mySubmit;

    return (
      <Modal show={true} onHide={hideHandler} className='copy-form-modal'>
        <Modal.Header>
          <Modal.Title>Копирование формы</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {
            isCopied ?
            <div className='alert alert-success' role='alert'>
              <b>Успех!</b> Форма успешно скопирована
            </div> :
            copyError ?
            <div className='alert alert-danger' role='alert'>
              <b>Ошибка!</b> {copyError}
            </div> :
            null
          }

          {
            (isCopied || copyError) ?
            null :
            <form role='form' onSubmit={handleSubmit(mySubmit)}>

              <InputContainer
                label='Название копии формы'
                field={name}
                isRequired={true}>
                <InputText field={name}/>
              </InputContainer>

            </form>
          }
        </Modal.Body>

        <Modal.Footer>
          { 
            (isCopied || copyError) ?
            null :
            <button type='submit' className='btn btn-default btn-primary' onClick={handleSubmit(mySubmit)}>
              {
                isCopying ?
                <i className='fa fa-spinner fa-spin'></i> :
                null
              }
              Скопировать
            </button>
          }
          <button type='button' className='btn btn-default' onClick={() => {hideHandler(null)}}>
            {
              (isCopied || copyError) ?
              'Закрыть' :
              'Отмена'
            }
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CopyFormModal.propTypes = {
  hideHandler: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  successFunc: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    formId: state.copyModal.formId,
    isCopied: state.copyModal.isCopied,
    isCopying: state.copyModal.isCopying,
    copyError: state.copyModal.copyError
    // initialValues: {
    //   name: state.formsList.forms.filter((form) => (form.id === state.copyModal.formId))[0].name + ' копия'
    // }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    copyFormHandler: () => {
      dispatch( copyForm() )
    },
    copySuccessHandler: () => {
      dispatch( copySuccess() );
      ownProps.successFunc();
    },
    copyFailHandler: (error) => {
      dispatch( copyFailed(error) )
    }
  }
};

export default reduxForm({
  form: 'formCopy',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps)(CopyFormModal);