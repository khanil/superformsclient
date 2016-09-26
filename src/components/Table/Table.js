import React, { Component, PropTypes } from 'react';
import invariant from 'invariant';
import Header from './Header';
import Row from './Row';
import Cell from './Cell';
import * as BEM from './classes';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      empty: undefined,
      sortBy: null
    }

    this.sort = this.sort.bind(this);
  }

  static get classes() {
    return BEM;
  }

  buildEmptyRow() {
    const length = this.props.columns.length;
    const value = this.props.emptyDataMessage ||
                  'Отсутствуют данные';

    return (
      <Row classes={`${BEM.ROW_EMPTY}`}>
        <Cell
          classes={''}
          colSpan={length}
          value={value}
        />
      </Row>
    );
  }

  buildRows() {
    const {
      columns,
      number,
      onRowClick,
      rowClasses,
    } = this.props;

    const data = this.state.data;

    if (this.state.empty)
      return this.buildEmptyRow();

    invariant(
      Array.isArray(data),
      'Data must be an array'
    );

    return data.map((chunk, i) => (
      <Row
        classes={rowClasses}
        data={chunk}
        key={chunk.id}
        onRowClick={onRowClick}
        rowN={i}
      >
        {this.buildRowCells(i, chunk)}
      </Row>
    ));
  }

  buildRowCells(rowN, data) {
    const {
      columns,
      number
    } = this.props;
    const cells = [];

    if (number) {
      cells.push(<Cell key={`${data.id}__#_`} value={rowN + 1} />);
    }

    cells.push(
      columns.map((col) => {
        const { key } = col;

        return (
          <Cell
            classes={col.cellClasses}
            data={data}
            key={`${data.id}_${key}`}
            renderCell={col.renderCell}
            value={data[key]}
          />
        );
      })
    );

    return cells;
  }

  sort(field, sortFn) {
    this.setState((state) => ({
      //checks if already sorted by given field
      data: (state.sortBy !== field) ? state.data.sort((a, b) => sortFn(a[field], b[field]))
                                     : state.data.reverse(),
      sortBy: field
    }));
  }

  componentWillMount() {
    const data = this.props.data;
    if (data === undefined || data === null || data.length === 0) {
      this.setState({
        empty: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data;
    const isEmpty = (data === undefined || data === null || data.length === 0);

    this.setState({
      data,
      empty: isEmpty ? true : false
    });
  }

  render() {
    return (
      <div className={`${BEM.TABLE} table-responsive ` + (this.props.name ?
                                                         `${BEM.TABLE}_name_${this.props.name}` :
                                                         '')}>
        <table className='table table-hover table-bordered'>
          <Header
            columns={this.props.columns}
            number={this.props.number}
            sort={!this.state.empty ? this.sort : undefined}
            sortBy={this.state.sortBy}
          />
          <tbody className={`${BEM.BODY}`}>
            {this.buildRows()}
          </tbody>
        </table>
      </div>
    );
  }
}