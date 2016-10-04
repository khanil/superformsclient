import React, { Component, PropTypes } from 'react';
import * as BEM from './classes';
import shallowCompare from 'react-addons-shallow-compare';
import invariant from 'invariant';

/** Table row component */
export default class Row extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
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
    // console.log('--------');
    // for (let key in nextProps) {
    //   const equal = nextProps[key] === this.props[key];
    //   // console.log(nextProps[key]);
    //   // console.log(this.props[key]);
    //   console.log(`${key} ${equal}`);
    // }
    // console.log('--------');
    console.log('row update? ' + update);
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
        {this.props.children}
      </tr>
    );
  }
}

Row.propTypes = {
  classes: PropTypes.string,
  data: PropTypes.object,
  onRowClick: PropTypes.func
}