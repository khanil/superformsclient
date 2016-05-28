import React from 'react';
import InputText from './../inputs/InputText';
import InputTextarea from './../inputs/InputTextarea';
import InputSelect from './../inputs/InputSelect';
import InputContainer from './../inputs/InputContainer';
import { ALL_TYPES_ARRAY } from './../../constants/formTypes';
import * as generationLabels from './../../labels/formGeneration';

const Header = ({ 
  name,
  description,
  type
}) => (

  <div className='formTitle'>

    <InputContainer
      field={type}
      label={generationLabels.FORM_TYPE}
      options={ALL_TYPES_ARRAY}
      isRequired= {true} >
      <InputSelect field={type} options={ALL_TYPES_ARRAY} />
    </InputContainer>

    <InputContainer
      field={name}
      label={generationLabels.FORM_NAME}
      isRequired={true} >
      <InputText field={name} />
    </InputContainer>

    <InputContainer
      field={description}
      label={generationLabels.FORM_DESCRIPTION} >
      <InputTextarea field={description} />
    </InputContainer>

  </div>

);

export default Header;