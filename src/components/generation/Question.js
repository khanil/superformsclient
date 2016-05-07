import React, { Component } from 'react';
import InputText from './../inputs/InputText';
import InputTextarea from './../inputs/InputTextarea';
import InputSelect from './../inputs/InputSelect';
import InputOption from './../inputs/InputOption';
import { ALL_TYPES_ARRAY, LIST } from './../../constants/questionTypes';
import * as generationLabels from './../../labels/formGeneration';

export default class Question extends Component {

  render() {

    const {
      field: { title, description, type, options },
      index,
      disabledBtn,
      removeHandler,
      swapUpHandler,
      swapDownHandler,
      addCopy
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

        <span><b>{'# ' + (index + 1) }</b></span>
        <div className='btn-group question-config-btn pull-right' role='group' aria-label='...'>
          <button 
            type='button' 
            className='btn btn-default'
            disabled={(disabledBtn.up) ? 'disabled' : null}
            onClick={swapUpHandler} >
            <span className='glyphicon glyphicon-arrow-up' aria-hidden='true'></span>
          </button>
          <button 
            type='button' 
            className='btn btn-default'
            disabled={(disabledBtn.down) ? 'disabled' : null}
            onClick={swapDownHandler} >
            <span className='glyphicon glyphicon-arrow-down' aria-hidden='true'></span>
          </button>
          <button 
            type='button' 
            className='btn btn-default'
            onClick={addCopy}
           >
            <span className='glyphicon glyphicon-duplicate' aria-hidden='true'></span>
          </button>
          <button 
            type='button' 
            className='btn btn-default'
            onClick={removeHandler} >
            <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
          </button>
        </div>
        <div className='clearfix'></div>

        <InputText
          label= {generationLabels.QUESTION_NAME}
          field= {title} 
          isRequired= {true}
        />

        <InputTextarea
          label= {generationLabels.QUESTION_DESCRIPTION}
          field= {description}
        />

        <InputSelect
          label= {generationLabels.ANSWER_TYPE}
          field= {type}
          options= {ALL_TYPES_ARRAY}
          isRequired= {true}
        />

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