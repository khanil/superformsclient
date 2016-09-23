import React, { Component, PropTypes } from 'react';

export default class ButtonGlyphicon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const type = this.props.type || 'default'
    const {
      icon,
      onClick
    } = this.props;

    return (
      <button type="button" className={`btn btn-${type}`} onClick={onClick}>
          <span className={`glyphicon glyphicon-${icon}`} aria-hidden='true'></span>
      </button>
    );
  }
}

ButtonGlyphicon.propTypes = {
  icon: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired
}