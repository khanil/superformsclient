import React, { Component } from 'react';

class QuestionDescription extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleVisibilityHandler = this.toggleVisibilityHandler.bind(this);
  }

  toggleVisibilityHandler() {
    const currentState = this.state.visible;

    this.setState({
      visible: !currentState
    })
  }

  render() {

    const {
      text
    } = this.props;

    const {
      visible
    } = this.state;

    return (
      <div className='question-description-container'>
        {/**/}
        <button
          type='button'
          className='btn btn-info btn-xs'
          onClick={this.toggleVisibilityHandler}>
          <i className='fa fa-info-circle' aria-hidden='true' onClick={this.toggleVisibilityHandler}></i>
        </button>
        {
          visible ?
          <p className='bg-info'>
          {text}
          </p> :
          null
        }
      </div>
    );
  }
}

export default QuestionDescription;