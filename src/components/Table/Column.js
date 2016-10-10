import React, { Component, PropTypes } from 'react';
import * as BEM from './classes';

/** Table header column component */
export default class Column extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    const {sort, id, sortFn, sortDir, value} = this.props;

    if (sort && sortFn) {
      //if value is dropdown ignore clicking on it
      if (typeof(value) === 'object') {
        let target = e.target;

        while (target.classList.contains(BEM.COLUMN) === false) {
          if (target.classList.contains('dropdown-toggle')
            || target.classList.contains('dropdown')) {
            return;
          }
          target = target.parentNode;
        }
      }

      sort(id, sortFn, sortDir === 'desc' ? 'asc' : 'desc');
    }
  }

  getTitle() {
    if (!this.props.usingForSort)
      return null;
    if (this.props.sortDir === 'asc') {
      return 'Отсортировано по возрастанию';
    } else {
      return 'Отсортировано по убыванию';
    }
  }

  renderCarret() {
    const sortType = this.props.sortDir;

    return (
      <i
        className={`pull-right fa fa-sort-${sortType}`}
        aria-hidden='true'
      >
      </i>
    );
  }

  render() {
    const {
      classes = '',
      id,
      sortDir,
      usingForSort,
      value
    } = this.props;

    const sortClass = usingForSort ? `th_sort_${sortDir}` : '';
    const clickable = this.props.sort ? BEM.COLUMN_CLICKABLE : '';
    const idClass = `${BEM.COLUMN}_id_${id}`;

    return (
      <th
        className={`${BEM.COLUMN} ${sortClass} ${classes} ${clickable} ${idClass}`}
        title={this.getTitle()}
        onClick={clickable ? this.clickHandler : null}
      >
      {value}
      { usingForSort ? this.renderCarret() : null }
      </th>
    );
  }
}

Column.propTypes = {
  
}