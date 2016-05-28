import React, { Component } from 'react';

class InputContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tipVisible: false
    };

    this.toggleTipVisibilityHandler = this.toggleTipVisibilityHandler.bind(this);
  }

  toggleTipVisibilityHandler() {
    const currentState = this.state.tipVisible;

    this.setState({
      tipVisible: !currentState
    })
  }

  render() {

    const {
      field,
      label,
      description,
      isRequired=false,
      children
    } = this.props;

    const labelNode = (label)
      ? <label htmlFor={field.name} className='control-label'>
          {label + ( (isRequired) ? '*' : '') }
        </label>
      : null;

    const errorNode = (field.touched && field.error)
      ? <div className='help-block'>{field.error}</div>
      : null;

    const validationClass = (field.touched)
    ? (field.invalid)
      ? 'has-error'
      : 'has-success'
    : '';

    const {
      tipVisible
    } = this.state;

    const descriptionBtn = description
    ? <button
        type='button'
        className='btn btn-info btn-xs btn-tip'
        onClick={this.toggleTipVisibilityHandler}>
        <i className='fa fa-info' aria-hidden='true'></i>
      </button>
    : null;

    return (
      <div className={'form-group ' + validationClass}>
        {labelNode}
        {descriptionBtn}
        {
          tipVisible ?
          <p className='bg-info'>
            {description}
          </p> :
          null
        }
        {children}
        {errorNode}
      </div>
    );
  }
}

export default InputContainer;