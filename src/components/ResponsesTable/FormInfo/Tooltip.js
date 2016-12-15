import React, { Component, PropTypes } from 'react';

export default class Tooltip extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      text
    } = this.props;

    if (text == undefined)
      return null;

    return (
      <span
        className='glyphicon glyphicon-info-sign description'
        aria-hidden='true'
        title={text}
      >
      </span>
    );
  }
}

Tooltip.propTypes = {
  text: PropTypes.string
}