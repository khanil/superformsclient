import React, { Component, PropTypes } from 'react';

export default class Status extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      updated,
      updating
    } = this.props;

    if (updating) {
      return (
        <span style={{paddingRight: '10px'}}>Обновление...</span>
      );
    }

    return (
      <span style={{paddingRight: '10px'}}>Последнее обновление в {updated}</span>
    );
  }
}

Status.propTypes = {
  updating: PropTypes.bool.isRequired,
  updated: PropTypes.string
}