import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

/** Dropdown component */
export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
    }

    this.optionClickHandler = this.optionClickHandler.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  optionClickHandler(col) {
    this.props.changeHandler(this.props.id, col);
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.setState(({opened}) => ({
      opened: !opened
    }));
  }

  renderMenu() {
    const columns = this.props.columns;
    return columns.map((col) => 
      <li key={col.key} onClick={this.optionClickHandler.bind(null, col)}>
        <a href="#">{col.title}</a>
      </li>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    const update = shallowCompare(this, nextProps, nextState);
    // console.log(update);
    return update;
  }

  render() {
    const iClass = this.state.opened ? 'asc' : 'desc';

    return (
      <div className="dropdown">
        <span
          className="dropdown-toggle"
          onClick={this.toggleDropdown}
          aria-haspopup="true"
          aria-expanded="true">
          {this.props.active.title}
          <button className='btn btn-default'>
            <i className={`fa fa-sort-${iClass}`} aria-hidden='true'/>
          </button>
        </span>
        <ul
          className="dropdown-menu"
          style={{display: this.state.opened ? 'block' : 'none'}}>
          {this.renderMenu()}
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  active: PropTypes.object,
  changeHandler: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired
}