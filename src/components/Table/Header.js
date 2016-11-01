import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import invariant from 'invariant';
import Row from './Row';
import Column from './Column';
import Dropdown from './Dropdown';
import * as BEM from './classes';

/** Header component */
export default class Header extends Component {
  constructor(props) {
    super(props);

    /**
     * @param {Array} dropdowns - Active columns for each header dropdown
     */
    this.state = {
      dropdowns: []
    }

    this.dropdownChangeHandler = this.dropdownChangeHandler.bind(this);
  }

  /**
   * Returns column with dropdown picker
   * @param  {number} id      State dropdown identifier
   * @param  {Array} columns  Dropdown options
   * @return {Object}         React component
   */
  buildDropdown(id, columns) {
    const active = this.state.dropdowns[id];

    const value = <Dropdown
      active={active}
      changeHandler={this.dropdownChangeHandler}
      columns={columns}
      id={id}
    />;

    const sortFn = (active.sortFn) ? active.sortFn : Header.sortFnDefault;
    const usingForSort = this.props.sortField === active.key;

    return <Column
      classes={active.classes}
      id={active.key}
      key={active.key}
      sort={active.sort !== false ? this.props.sort : undefined}
      sortDir={usingForSort ? this.props.sortDir : undefined}
      sortFn={sortFn}
      value={value}
      usingForSort={usingForSort}
    />;
  }

  /**
   * Returns table header
   * @return {Object} React component
   */
  buildHeader() {
    const {
      columns,
      showSerial
    } = this.props;

    invariant(
      Array.isArray(columns),
      'Columns must be an array'
    );

    const header = [];

    if (showSerial) {
      invariant(
        typeof(showSerial) === 'boolean',
        'Number option must be boolean'
      );

      header.push(<Column key={'#'} value={'#'}/>);
    }

    let dropdownCount = 0;

    header.push(
      columns.map((col) => {
        if (Array.isArray(col)) {
          return this.buildDropdown(dropdownCount++, col);
        }

        const sortFn = (col.sortFn) ? col.sortFn : Header.sortFnDefault;
        const usingForSort = this.props.sortField === col.key;

        return <Column
          classes={col.classes}
          id={col.key}
          key={col.key}
          sort={col.sort !== false ? this.props.sort : undefined}
          sortDir={usingForSort ? this.props.sortDir : undefined}
          sortFn={sortFn}
          value={col.title}
          usingForSort={usingForSort}
        />
      })
    );

    return header;
  }

  /**
   * Dropdown option select handler
   * @param  {number} id  Dropdown identifier
   * @param  {Object} col Selected option
   */
  dropdownChangeHandler(id, col) {
    const dropdowns = this.state.dropdowns;
    if (dropdowns[id] === col) 
      return;

    const copy = dropdowns.slice();
    copy[id] = col;
    this.setState({
      dropdowns: copy
    });
    this.updateTableColumns(copy);
  }

  /**
   * Default sort function
   */
  static sortFnDefault(a, b) {
    //strings sorting
    if (a < b) return 1;
    if (a > b) return -1;
  }

  /**
   * Rebuilds header columns based on currently picked dropdown options
   * @param  {Array} dropdowns Current dropdown options
   */
  updateTableColumns(dropdowns) {
    let dropdownCount = 0;
    const columns = this.props.columns.map((col) => {
      if (Array.isArray(col)) {
        return dropdowns[dropdownCount++];
      }
      return col;
    });

    this.props.setColumns(columns);
  }

  componentWillMount() {
    let defaultSortBy = this.props.defaultSortBy;
    const dropdowns = [];

    const columns = this.props.columns.map((col) => {
      if (Array.isArray(col)) {
        if (defaultSortBy) {
          for (let i = 0; i < col.length; i++) {
            if (col[i].key === defaultSortBy) {
              dropdowns.push(col[i]);
              defaultSortBy = undefined;
              return col[i];
            }
          }
        }
        const defaultActive = col[0];
        dropdowns.push(defaultActive);
        return defaultActive;
      }

      return col;
    });

    this.setState({
      dropdowns
    });

    this.props.setColumns(columns);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.columns !== nextProps.columns) {
      let defaultSortBy = nextProps.defaultSortBy;
      const dropdowns = [];

      const columns = nextProps.columns.map((col) => {
        if (Array.isArray(col)) {
          if (defaultSortBy) {
            for (let i = 0; i < col.length; i++) {
              if (col[i].key === defaultSortBy) {
                dropdowns.push(col[i]);
                defaultSortBy = undefined;
                return col[i];
              }
            }
          }
          const defaultActive = col[0];
          dropdowns.push(defaultActive);
          return defaultActive;
        }

        return col;
      });

      this.setState({
        dropdowns
      });

      this.props.setColumns(columns);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <thead className={`${BEM.HEADER}`}>
        <Row>
          {this.buildHeader()}
        </Row>
      </thead>
    );
  }
}