import React, { Component, PropTypes } from 'react';

class Dropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    const currentState = this.state.isVisible;

    this.setState({
      isVisible: !currentState
    })
  }

  render() {

    const {
      isVisible
    } = this.state;

    const {
      options,
      selected,
      classList = null,
      btnClassList = null,
      changeHandler
    } = this.props;

    const displayStyle = (isVisible) ? 'block' : 'none';

    const optionsNode = [];
    for (let key in options) {
      let option = options[key];

      optionsNode.push(
        <li
          key={key}
          onClick={
            () => {
              changeHandler(key);
              this.toggleDropdown();
            }
          }>
          <a href='#'>{option}</a>
        </li>
      );
    }

    return (
      <div className={'dropdown ' + classList}>
        <div 
          className={'dropdown-toggle ' + btnClassList}
          type='button'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='true'
          onClick={this.toggleDropdown}
          style={{cursor: 'pointer'}}>
          <span>{options[selected]}</span>
          <span className='caret'></span>
        </div>
        <ul
          className='dropdown-menu'
          style={{display: displayStyle}}>
          {optionsNode}
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired
};

export default Dropdown;