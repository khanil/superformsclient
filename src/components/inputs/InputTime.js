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
  field
}) => (
  <DateTimePicker
    format='HH:mm'
    calendar={false}
    value={(field.value) ? Moment(field.value).toDate() : null}
    onChange={field.onChange}
  />
);

export default InputTime;