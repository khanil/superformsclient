import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import { bindFunctions } from '../../utils';

const defaults = {
  title: 'Произошла ошибка',
  btn: {
    text: 'На главную',
    style: 'btn-default'
  }
}

export default class ModalError extends Component {
  constructor(props) {
    super(props);

    bindFunctions.call(this, ['renderFooter', 'renderBody']);
  }

  renderFooter() {
    const {
      style,
      text
    } = this.props.btn;
    const hideModal = this.props.hideModal;

    return (
      <div>
        <button type="button" className={`btn ${style}`}
          onClick={hideModal}>
          {text}</button>
      </div>
    );
  }

  renderBody() {
    const body = this.props.body;

    if (typeof(body) === 'string') {
      return (
        <div className='alert alert-danger' role='alert'>
          {body}
        </div>
      );
    } else {
      return body;
    }
  }

  render() {
    const {

    } = this.props;

    return (
      <Modal
        title={this.props.title}
        body={this.renderBody()}
        footer={this.renderFooter()}
      />
    );
  }
}

ModalError.propTypes = {
  title: PropTypes.string,
  btn: PropTypes.shape({
    text: PropTypes.string,
    style: PropTypes.string
  }),
  hideModal: PropTypes.func.isRequired,
  body: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired
}

ModalError.defaultProps = defaults;
