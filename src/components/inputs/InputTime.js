/*
 * Компонент содержит поле для ввода времени
 */

import React from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/lib/less/react-widgets.less';
import Moment from 'moment';
Moment.locale('ru');
import momentLocalizer from 'react-widgets/lib/localizers/moment';

momentLocalizer(Moment);

const InputTime = ({
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
        format='HH:mm'
        calendar={false}
        defaultValue={null}
        onChange={field.onChange}
      />
      {field.touched && field.error && <div className='help-block'>{field.error}</div>}
    </div>
  );

}

export default InputTime;