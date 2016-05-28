import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

import { returnToLastSave } from './../../actions/actionsGeneration';
import { showModal as showSendModal, hideModal as hideSendModal } from './../../actions/actionsSendModal';

import SendFormModal from './../../components/widgets/SendFormModal';

import Moment from 'moment';
Moment.locale('ru');

class GenerationHeader extends Component {

  openPreviewPage = () => {
    const id = this.props.formId;

    if (id === undefined) return;

    var adds = this.props.previewUrl.replace('id', id);

    window.open(window.location.origin + adds, '_blank');
  }

  render() {
    const {
      isSending,
      savingError,
      isSaved,
      lastSave,
      sendBoilerplateHandler,
      returnToLastSaveHandler,
      isSendModalVisible,
      showSendModalHandler,
      hideSendModalHandler,
      urls,
      formId
    } = this.props;

    if (!isSaved) {
      window.onbeforeunload = function() {
        return 'Данные не сохранены. Точно перейти?';
      };
    } else {
      window.onbeforeunload = null;
    }

    return (
      <div className='row'>
        <div className='col-md-6 col-lg-6 page-header-info'>
          {
            isSending ?
            <p className='text-success page-header-status'>Сохранение...</p> :
              savingError ?
              <p className='text-danger page-header-status'>{savingError}</p> :
                isSaved ?
                <p className='text-success page-header-status'>Изменения сохранены</p> :
                <p className='text-warning page-header-status'>Есть несохраненные изменения</p>
          }
          {
            lastSave ?
            <p className='text-success page-header-save'>{'Последнее сохранение: ' + Moment(lastSave).format('DD/MM/YY HH:mm')}</p> :
            null
          }
        </div>
        <div className='col-md-6 col-lg-6 page-header-btns'>
          <div className='pull-right'>
            <div className='btn-group' role='group' aria-label='...'>
              <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip>Вернуться к сохрененной копии</Tooltip>}
              >
                <button
                  type='button'
                  className='btn btn-default'
                  onClick={returnToLastSaveHandler}
                  disabled={ (isSaved || !lastSave) ? 'disabled' : null }
                >
              <i className='fa fa-undo' aria-hidden='true'></i>
            </button>
            </OverlayTrigger>
            <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip>Предпросмотр</Tooltip>}
            >
              <button
                  type='botton'
                  className='btn btn-default'
                  onClick={this.openPreviewPage}
                  disabled={ (isSaved) ? null : 'disabled'}
                >
                <i className='fa fa-eye' aria-hidden='true'></i>
              </button>
            </OverlayTrigger>
            <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip>Отправить</Tooltip>}
            >
              <button
                  type='button'
                  className='btn btn-default'
                  onClick={ () => { showSendModalHandler(formId)} }
                  disabled={ (isSaved) ? null : 'disabled'}
                >
                <i className='fa fa-paper-plane' aria-hidden='true'></i>
              </button>
            </OverlayTrigger>
            </div>
            <button
              type='button'
              className='btn btn-default'
              onClick={sendBoilerplateHandler}
            >
            Сохранить
            </button>
          </div>
        </div>

        {
          isSendModalVisible ?
          <SendFormModal
            hideHandler={hideSendModalHandler}
            url={urls.sendUrl}
          /> :
          null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSending: state.page.isSending,
    isSaved: state.page.isSaved,
    savingError: state.page.savingError,
    formId: state.boilerplate.id,
    previewUrl: state.page.urls.previewUrl,
    lastSave: state.page.lastSave,
    isSendModalVisible: state.sendModal.isVisible,
    urls: state.page.urls
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendBoilerplateHandler: () => {
      //TODO :
      //Сделать более универсальное обращение к кнопке
      document.getElementById('submit-btn').click();
    },
    returnToLastSaveHandler: () => {
      dispatch( returnToLastSave() );
    },
    showSendModalHandler: (id) => {
      dispatch( showSendModal(id) )
    },
    hideSendModalHandler: () => {
      dispatch( hideSendModal() )
    }
  }
};

export default connect(
mapStateToProps,
mapDispatchToProps
)(GenerationHeader);