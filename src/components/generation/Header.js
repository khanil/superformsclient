import React from 'react';
import InputText from './../inputs/InputText';
import InputTextarea from './../inputs/InputTextarea';

const Header = ({ 
  name,
  description 
}) => (

  <div className='formTitle'>

    <InputText 
      field= {name}
      label= 'Название формы'
      isRequired= {true} />

    <InputTextarea
      field= {description}
      label= 'Описание формы' />

  </div>

);

export default Header;