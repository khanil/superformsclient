import React, { Component, PropTypes } from 'react';
import { bindFunctions } from '../utils';
import ButtonGlyphicon from './ButtonGlyphicon';

export default class ControlButtons extends Component {
  constructor(props) {
    super(props);

    bindFunctions.call(this, []);
  }

  static get className() {
    return 'form-control-buttons';
  }

  getButtonsForSentForm() {
    const {
      showStatus,
      showResponses
    } = this.props;

    return (
      <div className='btn-group'>
        <ButtonGlyphicon icon='link' onClick={showStatus} title='Просмотр ссылки'/>
        <ButtonGlyphicon icon='list-alt' onClick={showResponses} title='Просмотр ответов'/>
      </div>
    );
  }

  getButtonsForUnsentForm() {
    const {
      send,
      edit
    } = this.props;

    return (
      <div className='btn-group'>
        <ButtonGlyphicon icon='send' onClick={send} title='Отправить'/>
        <ButtonGlyphicon icon='pencil' onClick={edit} title='Редактировать'/>
      </div>
    );
  }

  render() {
    const {
      isFormSent,
      copy,
      remove
    } = this.props;

    return (
      <div className={`btn-group ${this.constructor.className}`}>
        {
          isFormSent ?
          this.getButtonsForSentForm() :
          this.getButtonsForUnsentForm()
        }
        <ButtonGlyphicon icon='duplicate' onClick={copy} title='Скопировать'/>
        <ButtonGlyphicon icon='trash' onClick={remove} title='Удалить'/>
      </div>
    );
  }
}

ControlButtons.propTypes = {
  isFormSent: PropTypes.bool.isRequired,
  send: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  showStatus: PropTypes.func.isRequired,
  showResponses: PropTypes.func.isRequired,
  copy: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}