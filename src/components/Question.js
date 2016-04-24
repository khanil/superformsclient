import React, { Component } from 'react';
import InputText from './InputText';
import InputTextarea from './InputTextarea';
import InputSelect from './InputSelect';
import InputOption from './InputOption';
import { ALL_TYPES_ARRAY } from './../constants/questionTypes';

export default class Question extends Component {

  render() {

    const {
      field: { title, description, type, options },
      disabledBtn,
      removeHandler,
      swapUpHandler,
      swapDownHandler
    } = this.props;

    let flag = (type.value === 'Выбор из списка');

    let OptionsNode = options.map((option, index, options) => {
      return (
      <InputOption
       key= {index}
       label= {index + 1}
       field= {option}
       isRequired= {true}
       removeHandler= {() => {options.removeField(index)}} />
    )})

    return (
      <div className='questionGenerator'>

        <div className='btn-group question-conf-btn' role='group' aria-label='...'>
          <button 
            type='button' 
            className='btn btn-default'
            disabled={(disabledBtn.up) ? 'disabled' : null}
            onClick={swapUpHandler} >
            <span className='glyphicon glyphicon-menu-up' aria-hidden='true'></span>
          </button>
          <button 
            type='button' 
            className='btn btn-default'
            disabled={(disabledBtn.down) ? 'disabled' : null}
            onClick={swapDownHandler} >
            <span className='glyphicon glyphicon-menu-down' aria-hidden='true'></span>
          </button>
          <button 
            type='button' 
            className='btn btn-default'
            onClick={removeHandler} >
            <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
          </button>
        </div>

        <InputText
          label= 'Текст вопроса'
          field= {title}
          isRequired= {true} />

        <InputTextarea
          label= 'Описание вопроса'
          field= {description} />

        <InputSelect
          label= 'Тип вопроса'
          field= {type}
          isRequired= {true}
          options= {ALL_TYPES_ARRAY} />

        {
          (flag)
          ? OptionsNode
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