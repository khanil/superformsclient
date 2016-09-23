import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import { bindFunctions } from '../../utils';

const defaults = {
  title: 'Подтвердите действие',
  confirmBtn: {
    text: 'Подтвердить',
    style: 'btn-default'
  },
  abortBtn: {
    text: 'Отмена',
    style: 'btn-default'
  }
}


/**
 * Confirm window modal component with confirm and abort buttons
 */
export default class ModalConfirm extends Component {
  constructor(props) {
    super(props);
    bindFunctions.call(this, ['renderFooter']);
  }

  renderFooter() {
    const confirmText = this.props.confirmBtn.text || defaults.confirmBtn.text;
    const confirmStyles = this.props.confirmBtn.style || defaults.confirmBtn.style;
    const abortText = this.props.abortBtn.text || defaults.abortBtn.text;
    const abortStyles = this.props.abortBtn.style || defaults.abortBtn.style;
    const confirmHandler = this.props.confirmHandler;
    const abortHandler = this.props.hideModal;

    return (
      <div>
        <button type="button" className={`btn btn-confirm ${confirmStyles}`}
          onClick={confirmHandler}>
          {confirmText}</button>
        <button type="button" className={`btn btn-abort ${abortStyles}`}
          onClick={abortHandler}>
          {abortText}</button>
      </div>
    );
  }

  render() {
    const {
      title,
      body
    } = this.props;

    return (
      <Modal
        title={title}
        body={body}
        footer={this.renderFooter()}
      />
    );
  }
}

ModalConfirm.propTypes = {
  title: PropTypes.string,
  body: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  confirmBtn: PropTypes.shape({
    text: PropTypes.string,
    style: PropTypes.string
  }),
  abortBtn: PropTypes.shape({
    text: PropTypes.string,
    style: PropTypes.string
  })
}

ModalConfirm.defaultProps = defaults;
