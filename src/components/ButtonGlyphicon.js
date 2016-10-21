import React, { Component, PropTypes } from 'react';

export default class ButtonGlyphicon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const type = this.props.type || 'default'
    const {
      icon,
      onClick,
      title
    } = this.props;

    return (
      <button
        className={`btn btn-${type}`}
        onClick={onClick}
        title={title}
        type="button">
          <span
            className={`glyphicon glyphicon-${icon}`}
            aria-hidden='true'
          >
          </span>
      </button>
    );
  }
}

ButtonGlyphicon.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired
}