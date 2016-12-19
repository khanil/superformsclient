import React, { Component, PropTypes } from 'react';
import { bindFunctions } from '../utils';
import { modalTypes } from '../constants';
import { ModalConfirm, ModalError, ModalSuccess, ModalSingleInput, ModalSend,
ModalMessage } from './Modals';

const DOMDataContainerId = 'config';

//Helper react component, that extracts additional helper data,
//such as API callbacks from DOM markup
export default class AppComponent extends Component {
  constructor(props) {
    super(props);

    this._extraData = this.extractDataFromDOM();
    bindFunctions.call(this, ['getUrl', 'getPageType', 'setUrlId', 'renderModal']);
  }

  getUrl(id) {
    const url = this._extraData[id];
    if (url === undefined) {
      console.error(`Can't found API callback ${id} in DOM Element with id=${DOMDataContainerId}`);
    }
    return url;
  }

  getPageType() {
    const type = this._extraData['type'];
    if (type === undefined) {
      console.error(`Can't found page type in DOM Element with id=${DOMDataContainerId}`)
    }
    return type;
  }

  setUrlId(id) {
    const data = this._extraData;
    const urls = {};
    for (let key in data) {
      if (key.indexOf('Url') !== -1) {
        const url = data[key];
        urls[key] = url.replace('id', id);
      }
    }
    this._extraData = Object.assign(data, urls);
    console.log(this._extraData);
  }

  extractDataFromDOM() {
    const DOMDataContainer = document.getElementById(DOMDataContainerId);
    const data = JSON.parse(DOMDataContainer.innerHTML);
    console.log('Extracted data: ');
    console.log(data);
    if (data === undefined) {
      console.warn(`DOM Element with id=${DOMDataContainerId} not found or empty. It's may cause errors with API callbacks.`);
      return {};
    }
    return data;
  }

  renderModal() {
    const type = this.props.modal.get('type');
    const props = this.props.modal.get('payload').toJS();
    props.hideModal = this.props.hideModal;

    switch (type.toLowerCase()) {
      case modalTypes.CONFIRM_MODAL :
        return (
          <ModalConfirm {...props}/>
        );

      case modalTypes.ERROR_MODAL :
        return (
          <ModalError {...props}/>
        );

      case modalTypes.SUCCESS_MODAL :
        return (
          <ModalSuccess {...props}/>
        );

      case modalTypes.SINGLE_INPUT_MODAL :
        return (
          <ModalSingleInput {...props}/>
        );

      case modalTypes.SEND_MODAL :
        return (
          <ModalSend {...props}/>
        );

      case modalTypes.MESSAGE_MODAL :
        return (
          <ModalMessage {...props}/>
        );

      default :
        return null;
    }
  }

  render() {
    return (
      <div>
      {
        this.props.modal && this.props.modal.get('visible') ?
        this.renderModal() :
        null
      }
      </div>
    );
  }
}