import React, { Component, PropTypes } from 'react';
import * as BEM from './classes';

export default class Cell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes = '',
      colSpan = 1,
      data,
      renderCell,
      value
    } = this.props;

    return (
      <td
        className={`${BEM.CELL} ${classes}`}
        colSpan={colSpan}
      >
        {
          renderCell ?
          renderCell(value, data) :
          value
        }
      </td>
    );
  }
}