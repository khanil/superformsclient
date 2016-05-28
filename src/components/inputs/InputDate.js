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
  field
}) => (
  <DateTimePicker
    format='DD MMM YYYY'
    editFormat='DD/MM/YY'
    time={false}
    value={(field.value) ? Moment(field.value).toDate() : null}
    onChange={field.onChange}
  />
);

export default InputDate;