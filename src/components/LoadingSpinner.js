import React, { Component, PropTypes } from 'react';

export default class Spinner extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      className = '',
      iconSize = '1x',
      text = 'Загрузка'
    } = this.props;

    return (
      <div className={`loading-spinner ${className}`}>
        <i
          className={`fa fa-spinner fa-spin fa-${iconSize}`}
          aria-hidden="true">
        </i>
        <span>{text}</span>
      </div>
    );
  }
}

Spinner.propTypes = {
  className: PropTypes.string,
  iconSize: PropTypes.string,
  text: PropTypes.string
}