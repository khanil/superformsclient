import React, { Component, PropTypes } from 'react';
import { bindFunctions } from '../utils';
import ControlButtons from './ControlButtons';
import { formTypes } from '../constants';
import Moment from 'moment';
Moment.locale('ru');
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);

const dateFormat = 'DD.MM.YYYY';
const timeFormat = 'HH:mm';

export default class FormsTable extends Component {
  constructor(props) {
    super(props);

    bindFunctions.call(this, ['renderRows', 'renderRow', 'rowClickHandler']);
  }

  rowClickHandler(formId) {
    const previewForm = this.props.previewForm.bind(null, formId);

    function clickHandler(e) {
      let target = e.target;
      const currentTarget = e.currentTarget;

      while (target != currentTarget) {
        if ( target.classList.contains('btn-group') ) {
          return;
        }

        target = target.parentNode;
      }

      previewForm();
    }

    return clickHandler;
  }

  renderRows(forms) {
    if (forms.size === 0)
      return <tr><td colSpan='4' style={{textAlign: 'center'}}>Вы еще не создали ни одной формы</td></tr>

    const fields = ['index', 'title', 'type', 'created'];

    return forms.map((form) => {
      const formId = form.get('id');

      return (
        <tr
          key={formId}
          onClick={this.rowClickHandler(formId)}>
          {this.renderRow(form, formId, fields)}</tr>
      );
    });
  }

  renderRow(form, formId, fields) {
    const fieldsValues = {};
    fields.map((field) => { fieldsValues[field] = form.get(field) });

    const formIndex = fieldsValues['index'];
    const formName = fieldsValues['title'];
    const formType = fieldsValues['type'];
    const created = fieldsValues['created'];
    fieldsValues['type'] = formTypes[formType.toUpperCase()].label;
    fieldsValues['created'] = Moment(created).clone().format(`${dateFormat} ${timeFormat}`);

    const row = [];
    for (let key in fieldsValues) {
      const [value, i] = [fieldsValues[key], key];

      row.push(
        <td className={`td-table-forms-list_form-${key}`} key={`${formId}_${i}`}>{value}</td>
      );
    }

    const isFormSent = form.get('sent') !== null;

    const buttonsProps = {
      isFormSent,
      edit: this.props.editForm.bind(null, formId),
      showStatus: this.props.showStatus.bind(null, formId, formName),
      showResponses: this.props.showResponses.bind(null, formId),
      remove: this.props.removeForm.bind(null, formId),
      copy: this.props.copyForm.bind(null, formId, formName),
      send: this.props.sendForm.bind(null, formId)
    }

    row.push(
      <td key={`${formId}_btns`}>
        <ControlButtons {...buttonsProps}/>
      </td>
    );

    return row;
  }

  render() {
    const {
      forms
    } = this.props;

    return (
      <div className="table-responsive">
        <table className="table table-hover table-bordered table-forms-list">
          <thead>
            <tr>
              <th className='th-table-forms-list_form-index'>#</th>
              <th className='th-table-forms-list_form-title'>Название</th>
              <th className='th-table-forms-list_form-type'>Тип</th>
              <th className='th-table-forms-list_form-date'>Создано</th>
              <th className='th-table-forms-list_form-control'></th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows(forms)}
          </tbody>
        </table>
      </div>
    );
  }
}

FormsTable.propTypes = {
  forms: PropTypes.object.isRequired,
  sendForm: PropTypes.func.isRequired,
  editForm: PropTypes.func.isRequired,
  showStatus: PropTypes.func.isRequired,
  showResponses: PropTypes.func.isRequired,
  copyForm: PropTypes.func.isRequired,
  removeForm: PropTypes.func.isRequired,
  previewForm: PropTypes.func.isRequired
}