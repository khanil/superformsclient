import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import SendForm from './SendForm';
import PublishForm from './PublishForm';
import { changeSendMethod, sendForm, sendingSuccess, sendingFailed } from './../../actions/actionsSendModal';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import sendRequest from './../../utils/sendRequest';
import {getValues} from 'redux-form';


class SendFormModal extends Component {

  fields = [
    'type',
    'topic',
    'message',
    'recipients',
    'expires',
    'expireDate'
  ];

  handleSubmit = () => {
    this.refs.sendForm.submit();
  }

  distributeHandler = () => {
    this.props.sendFormHandler();
    const id = this.props.formId;

    let values = this.props.formValues;
    values.id = id;

    const str = JSON.stringify(values, '', 2);

    const adds = this.props.url.replace('id', id);

    sendRequest('POST', adds, str, this.props.sendSuccessHandler, this.props.sendFailHandler);
  }

  publishHandler = () => {
    this.props.sendFormHandler();
    const id = this.props.formId;

    const values = {
      formId: id
    };

    const str = JSON.stringify(values , '', 2);

    const adds = this.props.url.replace('id', id);

    sendRequest('POST', adds, str, this.props.sendSuccessHandler, this.props.sendFailHandler);
  }

  render() {

    const {
      hideHandler,
      sendMethod,
      formId,
      isSending,
      isSent,
      sendingError,
      changeSendMethodHandler
    } = this.props;

    return (
      <Modal show={true} onHide={hideHandler} className='send-form-modal'>
        <Modal.Header>
          <Modal.Title>Отправка формы</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          {
            isSent ?
            <div className='alert alert-success' role='alert'>
              <b>Успех!</b> Форма успешно отправлена
            </div> :
            sendingError ?
            <div className='alert alert-danger' role='alert'>
              <b>Ошибка!</b> {sendingError}
            </div> :
            null
          }

          {
            (isSent || sendingError) ?
            null :
            <div className='send-method-container form-group'>
              <label>Способ отправки:</label>

              <ul className='nav nav-pills'>
                <OverlayTrigger
                  placement='top'
                  overlay={<Tooltip>Почтовая рассылка</Tooltip>}
                >
                  <li 
                    role='presentation' 
                    className={(sendMethod === 'mail') ? 'active' : ' '}
                  >
                    <a href='#' onClick={() => {changeSendMethodHandler('mail')}}>
                      <span className='glyphicon glyphicon-envelope' aria-hidden='true'></span>
                    </a>
                  </li>
                </OverlayTrigger>
                <OverlayTrigger
                  placement='top'
                  overlay={<Tooltip>По ссылке</Tooltip>}
                >
                  <li 
                    role='presentation'
                    className={(sendMethod === 'link') ? 'active' : ' '}
                  >
                    <a href='#' onClick={() => {changeSendMethodHandler('link')}}>
                      <span className='glyphicon glyphicon-link' aria-hidden='true'></span>
                    </a>
                  </li>
                </OverlayTrigger>
              </ul>
            </div>
          }

          {
            (isSent || sendingError) ?
            null :
            (sendMethod === 'mail') ?
            <SendForm
              ref='sendForm'
              onSubmit={this.distributeHandler}
              fields={this.fields}
            /> :
            <PublishForm
              formId={formId}
            />
          }

        </Modal.Body>

        <Modal.Footer>

          {
            (isSent || sendingError) ?
            null:
            (sendMethod === 'mail') ?
            <button type='button' className='btn btn-default btn-primary' onClick={this.handleSubmit}>
              {
                isSending ?
                <i className='fa fa-spinner fa-spin'></i> :
                null
              }
              Отправить
            </button> :
            <button type='button' className='btn btn-default btn-primary' onClick={this.publishHandler}>
              {
                isSending ?
                <i className='fa fa-spinner fa-spin'></i> :
                null
              }
              Начать прием ответов
            </button>
          }

          <button type='button' className='btn btn-default' onClick={hideHandler}>
            {
              (isSent || sendingError) ?
              'Закрыть' :
              'Отмена'
            }
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

SendFormModal.propTypes = {
  hideHandler: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    sendMethod: state.sendModal.sendMethod,
    formId: state.sendModal.formId,
    formValues: getValues(state.form.formSending),
    isSending: state.sendModal.isSending,
    isSent: state.sendModal.isSent,
    sendingError: state.sendModal.sendingError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSendMethodHandler: (method) => {
      dispatch( changeSendMethod(method) )
    },
    sendFormHandler: () => {
      dispatch( sendForm() )
    },
    sendSuccessHandler: () => {
      dispatch( sendingSuccess() )
    },
    sendFailHandler: (error) => {
      dispatch( sendingFailed(error) )
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendFormModal)