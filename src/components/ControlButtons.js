import React, { Component, PropTypes } from 'react';
import { bindFunctions } from '../utils';
import ButtonGlyphicon from './ButtonGlyphicon';

export default class ControlButtons extends Component {
  constructor(props) {
    super(props);

    bindFunctions.call(this, []);
  }

  getButtonsForSentForm() {
    const {
      showStatus,
      showResponses
    } = this.props;

    return (
      <div className='btn-group'>
        <ButtonGlyphicon icon='stats' onClick={showStatus} />
        <ButtonGlyphicon icon='list-alt' onClick={showResponses} />
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
        <ButtonGlyphicon icon='send' onClick={send} />
        <ButtonGlyphicon icon='pencil' onClick={edit} />
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
      <div className='btn-group'>
        {
          isFormSent ?
          this.getButtonsForSentForm() :
          this.getButtonsForUnsentForm()
        }
        <ButtonGlyphicon icon='duplicate' onClick={copy}/>
        <ButtonGlyphicon icon='trash' onClick={remove}/>
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