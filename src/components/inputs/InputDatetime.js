/*
 * Компонент содержит поле для ввода даты и времени
 */

import React from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
Moment.locale('ru');
import momentLocalizer from 'react-widgets/lib/localizers/moment';

momentLocalizer(Moment);

const InputDate = ({
  field,
  label,
  isRequired = false,
  min = null,
  max = null
}) => {

  const labelNode = label
    ? <label htmlFor={field.name} className='control-label'>
        {label + ( (isRequired) ? '*' : '') }
      </label>
    : null;

  return (
    <div className={ (!field.touched) ? 'form-group' : (field.invalid) ?  'form-group has-error' : 'form-group has-success'}>
      {labelNode}
      <DateTimePicker
        format='DD MMM YYYY, HH:mm'
        value={(field.value) ? Moment(field.value).toDate() : null}
        onChange={field.onChange}
        min={min ? min : new Date(1900, 0, 1)}
        max={max ? max : new Date(2099, 11, 31)}
      />
      {field.touched && field.error && <div className='help-block'>{field.error}</div>}
    </div>
  );

}

export default InputDate;