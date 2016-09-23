import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';
import FormsTable from '../components/FormsTable';
import { bindFunctions } from '../utils';
import { fetchForms, showModal, hideModal, sendDeleteForm, sendCopyForm, sendForm} from '../actions';
import { removeFMConfig, copyFMConfig, statusFMConfig } from '../config';
import { modalTypes } from '../constants';

export default class MainPageApp extends AppComponent {
  constructor(props) {
    super(props);

    bindFunctions.call(this, ['redirectToResponsesPage', 'redirectToEditPage',
      'redirectToPreviewPage', 'remove', 'copy', 'send', 'showStatus']);
  }

  componentWillMount() {
    const urlType = 'getUrl';
    const url = this.getUrl(urlType);
    this.props.fetchForms(url);
  }

  redirectToResponsesPage(formId) {
    const urlType = 'reportUrl';
    const url = this.getUrl(urlType);
    document.location.pathname = url.replace('id', formId);
  }

  redirectToEditPage(formId) {
    const urlType = 'editUrl';
    const url = this.getUrl(urlType);
    document.location.pathname = url.replace('id', formId);
  }

  redirectToPreviewPage(formId) {
    const urlType = 'previewUrl';
    const url = this.getUrl(urlType);
    document.location.pathname = url.replace('id', formId);
  }

  copy(formId, name) {
    const urlType = 'copyUrl';
    const url = this.getUrl(urlType).replace('id', formId);

    const submitHandler = (value) => (this.props.sendCopyForm(url, formId, value));

    const payload = copyFMConfig;
    payload.label = `Введите название для копии формы "${name}"`;
    payload.submitHandler = submitHandler;

    this.props.showModal(modalTypes.SINGLE_INPUT_MODAL, payload);
  }

  remove(formId) {
    const urlType = 'deleteUrl';
    const url = this.getUrl(urlType).replace('id', formId);

    const confirmHandler = this.props.sendDeleteForm.bind(this, url, formId);

    const payload = removeFMConfig;
    payload.confirmHandler = confirmHandler;

    this.props.showModal(modalTypes.CONFIRM_MODAL, payload);
  }

  send(formId) {
    const urlType = 'sendUrl';
    const url = this.getUrl(urlType).replace('id', formId);

    const sendHandler = (config) => this.props.sendForm(url, formId, config);

    const payload = {};
    payload.sendHandler = sendHandler;

    this.props.showModal(modalTypes.SEND_MODAL, payload);
  }

  showStatus(formId, formName) {
    const urlType = 'statusUrl';
    const url = this.getUrl(urlType).replace('id', formId);

    const payload = statusFMConfig(formId, formName);

    this.props.showModal(modalTypes.MESSAGE_MODAL, payload);
  }

  render() {
    const {
      forms
    } = this.props;

    if (forms === undefined)
      return null;

    const tableProps = {
      forms,
      showResponses: this.redirectToResponsesPage,
      editForm: this.redirectToEditPage,
      previewForm: this.redirectToPreviewPage,
      removeForm: this.remove,
      copyForm: this.copy,
      sendForm: this.send,
      showStatus: this.showStatus
    }

    return (
      <div>
        <h3>Созданные формы:</h3>
        <FormsTable {...tableProps}/>
        {super.render()}
      </div>
    );
  }
}

MainPageApp.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    isFetching: state.formData.get('isFetching'),
    forms: state.formData.get('forms'),
    error: state.formData.get('error'),
    modal: state.modal
  };
};

const mapDispatchToProps = {
  fetchForms,
  showModal,
  hideModal,
  sendDeleteForm,
  sendCopyForm,
  sendForm
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageApp);