import React, { Component, PropTypes } from 'react';
import Tooltip from './Tooltip';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      description
    } = this.props;

    return (
      <div className='row'>
        <div className='col-xs-12'>
          <h1>
            {title}
            <Tooltip text={description} />
          </h1>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}