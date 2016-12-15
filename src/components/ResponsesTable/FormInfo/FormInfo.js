import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Attribute from './Attribute';

export default class FormInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      description,
      type,
      basis,
      basisname
    } = this.props;

    return (
      <div className='form-responses__header'>
        <Header title={title} description={description} />

        <Attribute label='Тип' value={type} />
        
        {/*TODO: undefined option*/}
        <Attribute label='Основание' value={`${basis}, ${basisname}`} />
      </div>
    );
  }
}

FormInfo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  basis: PropTypes.string,
  basisname: PropTypes.string
}