/*
  Заголовок формы-опроса на странице заполнения
 */

import React from 'react';

const Header = ({
  name,
  description
}) => (
  <div className='formTitle'>
    <h1>{name}</h1>
    {
      description ?
      <blockquote>{description}</blockquote> :
      null
    }
    
  </div>
);

export default Header;