import React, { Component } from 'react';
import InputContainer from './../inputs/InputContainer';
import InputText from './../inputs/InputText';
import InputTextarea from './../inputs/InputTextarea';
import InputSelect from './../inputs/InputSelect';
import InputOption from './../inputs/InputOption';
import ControlButtons from './ControlButtons';
import { ALL_TYPES_ARRAY, LIST } from './../../constants/questionTypes';
import * as generationLabels from './../../labels/formGeneration';

export default class Question extends Component {

  render() {

    const {
      field: { title, description, type, options },
      index,
      disabledBtns,
      removeHandler,
      swapUpHandler,
      swapDownHandler,
      addCopyHandler
    } = this.props;

    let flag = (type.value === LIST.value);

    let OptionsNode = options.map((option, index, options) => {
      return (
        <InputOption
         key= {index}
         label= {index + 1}
         field= {option}
         removeHandler= {() => {options.removeField(index)}}
        />
    )})

    return (
      <div className='questionGenerator'>

        {/*Порядковый номер вопроса*/}
        <span><b>{'# ' + (index + 1) }</b></span>

        <ControlButtons
          disabledBtns={disabledBtns}
          swapUpHandler={swapUpHandler}
          swapDownHandler={swapDownHandler}
          removeHandler={removeHandler}
          addCopyHandler={addCopyHandler}
        />

        <div className='clearfix'></div>

        <InputContainer
          label={generationLabels.QUESTION_NAME}
          field={title}
          isRequired= {true}>
          <InputText field={title}/>
        </InputContainer>

        <InputContainer
          label= {generationLabels.QUESTION_DESCRIPTION}
          field= {description}>
          <InputTextarea field= {description}/>
        </InputContainer>

        <InputContainer
          label={generationLabels.ANSWER_TYPE}
          field={type}
          isRequired={true}>
          <InputSelect
            field={type}
            options={ALL_TYPES_ARRAY}/>
        </InputContainer>

        {
          (flag)
          ? 
          <div className='form-group'>
            {OptionsNode}
          </div>
          : null
        }

        {
          (flag)
          ? <button 
              onClick= {() => { options.addField() }}
              type='button'
              className='btn btn-default'>
              Добавить
            </button>
          : null
        }

      </div>
    );

  }

}