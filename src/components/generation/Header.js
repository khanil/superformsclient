import React from 'react';
import InputText from './../inputs/InputText';
import InputTextarea from './../inputs/InputTextarea';
import InputSelect from './../inputs/InputSelect';
import { ALL_TYPES_ARRAY } from './../../constants/formTypes';
import * as generationLabels from './../../labels/formGeneration';

const Header = ({ 
  name,
  description,
  type
}) => (

  <div className='formTitle'>

    <InputSelect
      field= {type}
      label= {generationLabels.FORM_TYPE}
      options= {ALL_TYPES_ARRAY}
      isRequired= {true}
    />

    <InputText 
      field= {name}
      label= {generationLabels.FORM_NAME}
      isRequired= {true}
    />

    <InputTextarea
      field= {description}
      label= {generationLabels.FORM_DESCRIPTION}
    />

  </div>

);

export default Header;