import React, { Component, PropTypes } from 'react';
import debounce from 'throttle-debounce/debounce';
import ButtonGlyphicon from '../ButtonGlyphicon';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }

    this.inputHandler = this.inputHandler.bind(this);
    this.clear = this.clear.bind(this);
    this.search = debounce(300, this.props.onSearch);
  }

  clear() {
    if (this.state.value === '')
      return;

    const value = '';
    this.setState({
      value
    });
    this.props.onSearch(value);
  }

  inputHandler(e) {
    const value = e.target.value;
    this.setState({
      value
    });
    this.search(value);
  }

  render() {
    const value = this.state.value;

    return (
      <div className='form-group'>
        <label>Поиск</label>
        <div className="input-group">
          <input
            className='form-control'
            type='text'
            onChange={this.inputHandler}
            placeholder='Введите фамилию, имя пользователя'
            value={value}
          />
          <span className='input-group-btn'>
            <ButtonGlyphicon
              icon='remove'
              onClick={this.clear}
              title='Очистить поле'
            />
          </span>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
}