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
    <blockquote>{description}</blockquote>
  </div>
);

export default Header;