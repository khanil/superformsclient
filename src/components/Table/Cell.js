import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import * as BEM from './classes';

export default class Cell extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const update = shallowCompare(this, nextProps, nextState);
    // console.log('cell update? ' + update);
    return update;
  }

  render() {
    const {
      classes = '',
      colSpan = 1,
      id,
      data,
      renderCell,
      value
    } = this.props;

    const idClass = `${BEM.CELL}_id_${id}`;
    const displayValue = renderCell ? renderCell(value, data) : value;

    return (
      <td
        className={`${BEM.CELL} ${classes} ${idClass}`}
        colSpan={colSpan}
        title={renderCell ? null : value}
      >
        {displayValue}
      </td>
    );
  }
}