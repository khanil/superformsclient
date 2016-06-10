import React, { Component, PropTypes } from 'react';

class DropdownDouble extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    };

    this.toggleDropdownDouble = this.toggleDropdownDouble.bind(this);
  }

  toggleDropdownDouble() {
    const currentState = this.state.isVisible;

    this.setState({
      isVisible: !currentState
    })
  }

  // changeHandler(header, value) {
  //   let newState = {};
  //   newState[header] = value;

  //   this.setState(newState);
  // }

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

    const renderOptions = () => {
      const optionsNode = [];
      let key = 0;

      for (let header in options) {
        let optionList = options[header];

        optionsNode.push(<li className='dropdown-header'>{header}</li>);

        for (let value in optionList) {
          let title = optionList[value];

          optionsNode.push(
            <li
              key={key}
              onClick={
                () => {
                  changeHandler(header, value);
                }
              }>
              <a href='#'>
                {title}
                {
                  value === selected[header]
                  ? <i className='fa fa-check' aria-hidden='true'></i>
                  : null
                }
              </a>
            </li>
          );

          key++;
        }

        optionsNode.push(<li role='separator' className='divider'></li>);
      }

      optionsNode.pop();
      return optionsNode;
    }

    // const renderLabel = () => {
    //   let label = '';
    //   const devider = ' / ';

    //   for (let header in selected) {
    //     let value = selected[header];

    //     label += options[header][value];
    //     label += devider;
    //   }

    //   return label.slice(0, label.length-devider.length);
    // }

    return (
      <div className={'dropdown ' + classList}>
        <div 
          className={'dropdown-toggle ' + btnClassList}
          type='button'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='true'
          onClick={this.toggleDropdownDouble}
          style={{cursor: 'pointer'}}>
          <span>
            Применить фильтры
          </span>
          <span className='caret'></span>
        </div>
        <ul
          className='dropdown-menu'
          style={{display: displayStyle}}>
          {renderOptions()}
        </ul>
      </div>
    );
  }
}

DropdownDouble.propTypes = {
  options: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired
};

export default DropdownDouble;