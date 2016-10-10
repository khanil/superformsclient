import React, { Component, PropTypes } from 'react';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
  }

  renderTabs() {
    const {
      active,
      clickHandler,
      tabs
    } = this.props;

    return tabs.map((tab) => {
      return (
        <li
          className={active === tab ? 'active' : ''}
          key={tab}
          role="presentation"
          onClick={clickHandler.bind(null, tab)}
        >
          <a href="#">{tab}</a>
        </li>
      );
    });
  }

  render() {
    const {
      className = ''
    } = this.props;

    return (
      <ul className={`nav nav-pills ${className}`}>
        {this.renderTabs()}
      </ul>
    );
  }
}

Tabs.propTypes = {
  active: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired
}