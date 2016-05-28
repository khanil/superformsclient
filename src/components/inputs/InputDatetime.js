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
  min = null,
  max = null
}) => (
  <DateTimePicker
    format='DD MMM YYYY, HH:mm'
    value={(field.value) ? Moment(field.value).toDate() : null}
    onChange={field.onChange}
    min={min ? min : new Date(1900, 0, 1)}
    max={max ? max : new Date(2099, 11, 31)}
  />
);

export default InputDate;