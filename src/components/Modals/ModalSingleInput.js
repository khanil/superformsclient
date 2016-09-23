import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import { bindFunctions } from '../../utils';

const defaults = {
  title: '',
  submitBtn: {
    text: '',
    style: 'btn-default'
  },
  abortBtn: {
    text: 'Отмена',
    style: 'btn-default'
  }
}

export default class ModalSingleInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      error: ''
    }

    bindFunctions.call(this, ['renderBody', 'renderFooter', 'changeHandler', 'checkEmptiness', 'submitHandler']);
  }

  componentWillMount() {
    const value = this.props.initialValue;
    if (value) {
      this.setState({
        value
      });
    }
  }

  changeHandler(e) {
    const value = e.target.value;

    this.setState({
      value,
      error: ''
    });
  }

  checkEmptiness(value) {
    return (!value || value.length === 0 || (/^\s+$/).test(value));
  }

  renderBody() {
    const {
      label,
      placeholder
    } = this.props;

    const error = this.state.error;
    const vClass = error ? 'has-error' : null;

    return (
      <div className={`form-group ${vClass}`}>
        <label className="control-label">{label}</label>
        <input type="text" className="form-control" required="required" placeholder={placeholder}
          onChange={this.changeHandler}/>
        {
          error ?
          <div className='help-block'>{error}</div> :
          null
        }
      </div>
    );
  }

  submitHandler() {
    const {
      value,
      error
    } = this.state;
    
    const submitHandler = this.props.submitHandler;

    if (this.checkEmptiness(value)){
      this.setState({
        error: 'Поле не должно быть пустым'
      });

      return;
    }

    submitHandler(value);
  }

  renderFooter() {
    const submitText = this.props.submitBtn.text || defaults.submitBtn.text;
    const submitStyles = this.props.submitBtn.style || defaults.submitBtn.style;
    const abortText = this.props.abortBtn.text  || defaults.abortBtn.text;
    const abortStyles = this.props.abortBtn.style || defaults.abortBtn.style;
    const abortHandler = this.props.hideModal;

    return (
      <div>
        <button type="button" className={`btn btn-submit ${submitStyles}`}
          onClick={this.submitHandler}>
          {submitText}</button>
        <button type="button" className={`btn btn-abort ${abortStyles}`}
          onClick={abortHandler}>
          {abortText}</button>
      </div>
    )
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

ModalSingleInput.propTypes = {
  
}

ModalSingleInput.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  submitBtn: PropTypes.shape({
    text: PropTypes.string,
    style: PropTypes.string
  }),
  abortBtn: PropTypes.shape({
    text: PropTypes.string,
    style: PropTypes.string
  })
}

ModalSingleInput.defaultProps = defaults;