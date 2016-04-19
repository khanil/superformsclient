import React from 'react';
import InputText from './InputText';
import InputTextarea from './InputTextarea';

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