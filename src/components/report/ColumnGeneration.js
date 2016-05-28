import React, {PropTypes, Component} from 'react';
import InputContainer from './../inputs/InputContainer';
import InputSelect from './../inputs/InputSelect';
import InputText from './../inputs/InputText';
import * as questionTypes from './../../constants/questionTypes';
import { ACTIONS_WITH_DIGITS, ACTIONS_WITH_OTHER_TYPES } from './../../constants/actionsWithColumns';

class ColumnGeneration extends Component {

  columns;

  getColumns() {
    const header = this.props.header;
    const columns = [];

    for (let key in header) {
      columns.push(key);
    }

    return columns;
  }

  componentWillMount() {
    this.columns = this.getColumns();
  }

  render() {

    const {
      fields,
      header,
      index,
      swapDownHandler,
      swapUpHandler,
      removeHandler,
      disabledBtn
    } = this.props;

    const columns = this.columns;

    const getActions = () => {
      const selectedColumn = fields.questionTitle.value;
      const type = header[selectedColumn];

      switch (type) {

        case undefined:
          return [];

        case questionTypes.INTEGER.value:
        case questionTypes.FLOAT.value:
          return ACTIONS_WITH_DIGITS;

        default:
          return ACTIONS_WITH_OTHER_TYPES;
      }
    }

    return (
      <tr>
        <th scope='row'>
          {index}
        </th>
        <td>
          <InputContainer
            field={fields.questionTitle}>
            <InputSelect
              field={fields.questionTitle}
              options={columns}/>
          </InputContainer>
        </td>
        <td>
          <InputContainer
            field={fields.action}>
            <InputSelect
              field={fields.action}
              options={getActions()}/>
          </InputContainer>
        </td>
        <td>
          <InputContainer
            field={fields.newTitle}>
            <InputText field={fields.newTitle}/>
          </InputContainer>
        </td>
        <td className='td-btn'>
          <div className='btn-group'>
            <button 
              type='button' 
              className='btn btn-default'
              onClick={swapUpHandler}
              disabled={(disabledBtn.up) ? 'disabled' : null}
            >
              <span className='glyphicon glyphicon-arrow-up' aria-hidden='true'></span>
            </button>
            <button 
              type='button' 
              className='btn btn-default'
              onClick={swapDownHandler}
              disabled={(disabledBtn.down) ? 'disabled' : null}
            >
              <span className='glyphicon glyphicon-arrow-down' aria-hidden='true'></span>
            </button>
            <button 
              type='button' 
              className='btn btn-default'
              onClick={removeHandler}
              disabled={(disabledBtn.rmv) ? 'disabled' : null}
            >
              <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
            </button>
          </div>
        </td>
      </tr>
    )

  }

}

ColumnGeneration.propTypes = {
  fields: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  swapDownHandler: PropTypes.func.isRequired,
  swapUpHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
  disabledBtn: PropTypes.object.isRequired
}

export default ColumnGeneration;
