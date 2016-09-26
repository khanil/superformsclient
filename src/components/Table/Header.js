import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import invariant from 'invariant';
import Row from './Row';
import Column from './Column';
import * as BEM from './classes';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  buildHeader() {
    const {
      columns,
      number
    } = this.props;

    invariant(
      Array.isArray(columns),
      'Columns must be an array'
    );

    const header = [];

    if (number) {
      invariant(
        typeof(number) === 'boolean',
        'Number option must be boolean'
      );

      header.push(<Column key={'#'} value={'#'}/>);
    }

    header.push(
      columns.map((col) => {
        const sortFn = (col.sortFn) ? col.sortFn : sortFnDefault;

        return <Column
          classes={col.classes}
          id={col.key}
          key={col.key}
          sort={col.sort !== false ? this.props.sort : undefined}
          sortFn={sortFn}
          value={col.title}
          usingForSort={this.props.sortBy === col.key}
        />
      })
    );

    return header;
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

function sortFnDefault(a, b) {
  //strings sorting
  if (a > b) return 1;
  if (a < b) return -1;
}