import React, { Component, PropTypes } from 'react';

export default class Attribute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      label,
      value
    } = this.props;

    if (value == undefined)
      return null;

    return (
      <div className='row'>
        <div className='col-xs-12'>
          <span style={{paddingRight: '5px', fontWeight: 'bold'}}>{label + ':'}</span>
          <span>{value}</span>
        </div>
      </div>
    );
  }
}

Attribute.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
}