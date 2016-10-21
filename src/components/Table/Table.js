import React, { Component, PropTypes as PT } from 'react';
import invariant from 'invariant';
import shallowCompare from 'react-addons-shallow-compare';
import Header from './Header';
import Row from './Row';
import Cell from './Cell';
import Dropdown from './Dropdown';
import * as BEM from './classes';

/** Table component */
export default class Table extends Component {
  constructor(props) {
    super(props);

    /**
     * @param {Array} columns Table columns
     * @param {Object} data Table data
     * @param {string} sortField Field using for sort
     */
    this.state = {
      columns: [],
      data: this.props.data,
      sortDir: null,
      sortField: null
    }

    this.setColumns = this.setColumns.bind(this);
    this.sort = this.sort.bind(this);
  }

  /**
   * Returns empty row
   * @return {Object} React component
   */
  buildEmptyRow() {
    const length = this.props.columns.length;
    const value = this.props.emptyDataMessage || 'Отсутствуют данные';

    return (
      <Row classes={`${BEM.ROW_EMPTY}`}>
        <Cell
          colSpan={length}
          value={value}
        />
      </Row>
    );
  }

  /**
   * Returns table rows based on data
   * @return {Array} React components
   */
  buildRows() {
    const {
      onRowClick,
      rowClasses,
    } = this.props;
    const data = this.state.data;

    if ( this.isDataEmpty(data) )
      return this.buildEmptyRow();

    invariant(
      Array.isArray(data),
      'Data must be an array'
    );

    return data.map((chunk, i) => (
      <Row
        columns={this.state.columns}
        classes={rowClasses}
        data={chunk}
        key={chunk.id}
        onRowClick={onRowClick}
      >
      </Row>
    ));
  }

  /**
   * Get Table component CSS classes
   * @return {Object} BEM classes Object
   */
  static get classes() {
    return BEM;
  }

  /**
   * Checks is data empty
   * @param  {Array}  data Table data
   * @return {Boolean}
   */
  isDataEmpty(data) {
    return (data === undefined || data === null || data.length === 0);
  }

  /**
   * Sets columns to state
   * Using for communication between children and current store
   * @param {Array} columns Columns for assign
   */
  setColumns(columns) {
    this.setState({
      columns
    });
  }

  /**
   * Sorts table rows
   * @param  {string} field  Column key using for sort
   * @param  {function} sortFn Sorting function
   * @param  {string} order Sorting order
   */
  sort(field, sortFn, order = 'desc') {
    const {
      data,
      sortDir,
      sortField
    } = this.state;
    const dataCopy = this.isDataEmpty(data) ? [] : data.slice();

    const sortWrap = order === 'desc' ?
            (a, b) => sortFn(a[field], b[field]) :
            (a, b) => -sortFn(a[field], b[field]);

    dataCopy.sort(sortWrap);

    this.setState({
      data: dataCopy,
      sortField: field,
      sortDir: order
    });
  }

  findSortFn(field) {
    const columns = this.props.columns;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].key === field) {
        return columns[i].sortFn;
      }

      if (Array.isArray(columns[i])) {
        for (let j = 0; j < columns[i].length; j++) {
          if (columns[i][j].key === field) {
            return columns[i][j].sortFn;
          }
        }
      }
    }
    return null;
  }

  componentWillMount() {
    const defaultSortBy = this.props.defaultSortBy;
    const defaultSortOrder = this.props.defaultSortOrder || 'desc';
    const data = this.state.data;

    if (defaultSortBy) {
      const sortFn = this.findSortFn(defaultSortBy);
      this.sort(defaultSortBy, sortFn ? sortFn : Header.sortFnDefault, defaultSortOrder);
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.data !== nextProps.data) {
      this.state.data = nextProps.data;

      const {
        sortDir,
        sortField
      } = this.state;

      const sortFn = this.findSortFn(sortField);
      this.sort(sortField, sortFn ? sortFn : Header.sortFnDefault, sortDir);
    };
  }

  componentWillUpdate() {
    console.time('table ' + this.props.name);
  }

  componentDidUpdate() {
    console.timeEnd('table ' + this.props.name);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const update = shallowCompare(this, nextProps, nextState);
    return update;
  }

  render() {
    const {
      columns,
      defaultSortBy,
      name,
      showSerial
    } = this.props;

    const {
      sortDir,
      sortField
    } = this.state;

    const tName = name ? `${BEM.TABLE}_name_${name}` : '';
    const wrapperClass = `${BEM.TABLE} table-responsive ${tName}`;

    return (
      <div className={wrapperClass}>
        <table className='table table-hover table-bordered'>
          <Header
            columns={columns}
            defaultSortBy={defaultSortBy}
            showSerial={showSerial}
            setColumns={this.setColumns}
            sort={this.sort}
            sortDir={sortDir}
            sortField={sortField}
          />
          <tbody className={`${BEM.BODY}`}>
            {this.buildRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  columns: PT.arrayOf(
    PT.oneOfType([
      PT.shape({
        key: PT.string.isRequired,
        title: PT.string.isRequired,
        renderCell: PT.func,
        sortFn: PT.func
      }),
      PT.arrayOf(
        PT.shape({
          key: PT.string.isRequired,
          title: PT.string.isRequired,
          renderCell: PT.func,
          sortFn: PT.func
        })
      )
    ])
  ),
  data: PT.array.isRequired,
  defaultSortBy: PT.string,
  name: PT.string,
  showSerial: PT.bool,
  onRowClick: PT.func
}

/**
   * Returns row cells based on data chunk
   * @param  {number} serial Table row serial number
   * @param  {Object} data Data chunk
   * @return {Array}  React components
   */
  // buildRowCells(data) {
  //   const columns = this.state.columns;
  //   const cells = [];

  //   cells.push(
  //     columns.map((col) => {
  //       const { key } = col;

  //       return (
  //         <Cell
  //           classes={col.cellClasses}
  //           data={data}
  //           id={key}
  //           key={`${data.id}_${key}`}
  //           renderCell={col.renderCell}
  //           value={data[key]}
  //         />
  //       );
  //     })
  //   );

  //   return cells;
  // }