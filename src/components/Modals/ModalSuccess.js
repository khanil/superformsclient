import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import { bindFunctions } from '../../utils';

const defaults = {
  title: 'Действие успешно выполнено'
}

export default class ModalSuccess extends Component {
  constructor(props) {
    super(props);

    bindFunctions.call(this, ['renderBody', 'renderFooter']);
  }

  renderBody() {
    const body = this.props.body;

    if (typeof(body) === 'string') {
      return (
        <div className='alert alert-success' role='alert'>
          {body}
        </div>
      );
    } else {
      return body;
    }
  }

  renderFooter() {
    return (
      <div>
        <button type="button" className="btn btn-default"
          onClick={this.props.hideModal}>
          Ок</button>
      </div>
    );
  }

  render() {
    return (
      <Modal 
        title={this.props.title}
        body={this.renderBody()}
        footer={this.renderFooter()}
      />
    );
  }
}

ModalSuccess.propTypes = {
  title: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
  body: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired
}

ModalSuccess.defaultProps = defaults;