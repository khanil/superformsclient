/*
 * Компонент содержит поле для ввода даты
 */

import React from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
Moment.locale('ru');
import MomentLocalizer from 'react-widgets/lib/localizers/moment';

MomentLocalizer(Moment);

const InputDate = ({
  field,
  label,
  isRequired = false
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
        format='DD MMM YYYY'
        editFormat='DD/MM/YY'
        time={false}
        value={(field.value) ? Moment(field.value).toDate() : null}
        onChange={field.onChange}
      />
      {field.touched && field.error && <div className='help-block'>{field.error}</div>}
    </div>
  );

}

export default InputDate;