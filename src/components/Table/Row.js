import React, { Component, PropTypes } from 'react';
import * as BEM from './classes';
import shallowCompare from 'react-addons-shallow-compare';
import invariant from 'invariant';
import Cell from './Cell';

/** Table row component */
export default class Row extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  /**
   * Returns row cells based on data chunk
   * @return {Array}  React components
   */
  buildRowCells() {
    const {
      columns,
      data
    } = this.props;

    return columns.map((col) => {
      const { key } = col;

      return (
        <Cell
          classes={col.cellClasses}
          data={data}
          id={key}
          key={`${data.id}_${key}`}
          renderCell={col.renderCell}
          value={data[key]}
        />
      );
    });
  }

  clickHandler(e) {
    const {onRowClick} = this.props;
    if (onRowClick) {
      invariant(
        typeof(onRowClick) === 'function',
        'onRowClick must be a function'
      );

      const {
        data
      } = this.props;

      onRowClick(e, data);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const update = shallowCompare(this, nextProps, nextState);
    return update;
  }

  render() {
    const {
      classes = ''
    } = this.props;

    const clickable = this.props.onRowClick !== undefined;
    const clickableClass = clickable ? BEM.ROW_CLICKABLE : '';

    return (
      <tr
        className={`${BEM.ROW} ${classes} ${clickableClass}`}
        onClick={clickable ? this.clickHandler : null}
      >
        {
          this.props.children ?
          this.props.children :
          this.buildRowCells()
        }
      </tr>
    );
  }
}

Row.propTypes = {
  columns: PropTypes.array,
  classes: PropTypes.string,
  data: PropTypes.object,
  onRowClick: PropTypes.func
}