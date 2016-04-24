import React, { Component } from 'react';
import InputText from './InputText';
import InputTextarea from './InputTextarea';
import InputSelect from './InputSelect';
import InputOption from './InputOption';
import { STRING, PARAGRAPH, DATETIME, SELECT } from './../constants/questionTypes';

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
          options= {[ STRING, PARAGRAPH, DATETIME, SELECT ]} />

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


          {/*<div className='form-group'>
            <label>Вопрос</label>
            <input name={this.props.idd+'[questionTitle]'} type='text' className='form-control' required='required' />
          </div>

          <div className='form-group'>
            <label>Описание вопроса</label>
            <textarea name={this.props.idd+'[questionDescription]'} className='form-control' rows='3' />
          </div>

          <div className='form-group'>
            <label>Тип ответа</label> 
            <select name={this.props.idd+'[questionType]'} 
              className='form-control' 
              required='required' 
              defaultValue='string'
              onChange={this.changeHandler}>
              <option value='string'>Строка</option>
              <option value='paragraph'>Абзац</option>
              <option value='datetime'>Дата/Время</option>
              <option value='select'>Выбор из списка</option>
            </select>
          </div>

          <div className='form-group'>
            <div className='checkbox'>
              <label>
                <input name={this.props.idd+'[required]'} type='checkbox' defaultChecked='true' />
                Обязательный вопрос?
              </label>
            </div>
          </div>*/}

      </div>
    );

  }

}