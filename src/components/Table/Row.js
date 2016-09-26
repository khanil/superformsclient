import React, { Component, PropTypes } from 'react';
import * as BEM from './classes';
import invariant from 'invariant';

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
        data, rowN
      } = this.props;

      onRowClick(e, data, rowN);
    }
  }

  render() {
    const {
      classes = ''
    } = this.props;

    const clickable = this.props.onRowClick !== undefined;

    return (
      <tr
        className={`${BEM.ROW} ${classes}` + (clickable ?
                                              BEM.ROW_CLICKABLE :
                                              '')}
        onClick={clickable ? this.clickHandler : null}
      >
        {this.props.children}
      </tr>
    );
  }
}

Row.propTypes = {
  
}