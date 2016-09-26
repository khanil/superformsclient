import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';
import FormsTable from '../components/FormsTable';
import { bindFunctions } from '../utils';
import { fetchForms, showModal, hideModal, sendDeleteForm, sendCopyForm, sendForm} from '../actions';
import { removeFMConfig, copyFMConfig, statusFMConfig } from '../config';
import { modalTypes } from '../constants';
import Table from '../components/Table/Table';
import faker from 'faker';
import { formTypes } from '../constants';
import ControlButtons from '../components/ControlButtons';

import Moment from 'moment';
Moment.locale('ru');
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);
const dateFormat = 'DD.MM.YYYY';
const timeFormat = 'HH:mm';

export default class MainPageApp extends AppComponent {
  constructor(props) {
    super(props);

    this.myColumns = [
      {
        key: 'index',
        title: '#'
      },
      {
        key: 'title',
        title: 'Название'
      },
      {
        key: 'type',
        title: 'Тип',
        renderCell: (value) => (formTypes[value.toUpperCase()].label),
        sortFn: (a, b) => {
          const [a_label, b_label] = [formTypes[a.toUpperCase()].label, formTypes[b.toUpperCase()].label];
          if (a_label > b_label) return 1;
          if (a_label < b_label) return -1;
        }
      },
      {
        key: 'created',
        title: 'Создано',
        renderCell: (value) => (Moment(value).format(`${dateFormat} ${timeFormat}`)),
        sortFn: (a, b) => {
          const values = [a, b].map((v) => Moment(v).valueOf());
          return (values[0] - values[1]);
        }
      },
      {
        key: 'control',
        title: '',
        renderCell: (value, data) => (
          <ControlButtons
            isFormSent={data.sent !== null}
            edit={this.redirectToEditPage.bind(null, data.id)}
            showStatus={this.showStatus.bind(null, data.id, data.title)}
            showResponses={this.redirectToResponsesPage.bind(null, data.id)}
            remove={this.remove.bind(null, data.id)}
            copy={this.copy.bind(null, data.id, data.title)}
            send={this.send.bind(null, data.id)}
          />
        ),
        sort: false
      }
    ];

    bindFunctions.call(this, ['redirectToResponsesPage', 'redirectToEditPage',
      'redirectToPreviewPage', 'remove', 'copy', 'send', 'showStatus']);
  }

  componentWillMount() {
    const urlType = 'getUrl';
    const url = this.getUrl(urlType);
    this.props.fetchForms(url);
  }

  redirectToResponsesPage(formId) {
    const urlType = 'reportUrl';
    const url = this.getUrl(urlType);
    document.location.pathname = url.replace('id', formId);
  }

  redirectToEditPage(formId) {
    const urlType = 'editUrl';
    const url = this.getUrl(urlType);
    document.location.pathname = url.replace('id', formId);
  }

  redirectToPreviewPage(formId) {
    const urlType = 'previewUrl';
    const url = this.getUrl(urlType);
    document.location.pathname = url.replace('id', formId);
  }

  copy(formId, name) {
    const urlType = 'copyUrl';
    const url = this.getUrl(urlType).replace('id', formId);

    const submitHandler = (value) => (this.props.sendCopyForm(url, formId, value));

    const payload = copyFMConfig;
    payload.label = `Введите название для копии формы "${name}"`;
    payload.submitHandler = submitHandler;

    this.props.showModal(modalTypes.SINGLE_INPUT_MODAL, payload);
  }

  remove(formId) {
    const urlType = 'deleteUrl';
    const url = this.getUrl(urlType).replace('id', formId);

    const confirmHandler = this.props.sendDeleteForm.bind(this, url, formId);

    const payload = removeFMConfig;
    payload.confirmHandler = confirmHandler;

    this.props.showModal(modalTypes.CONFIRM_MODAL, payload);
  }

  send(formId) {
    const urlType = 'sendUrl';
    const url = this.getUrl(urlType).replace('id', formId);

    const sendHandler = (config) => this.props.sendForm(url, formId, config);

    const payload = {};
    payload.sendHandler = sendHandler;

    this.props.showModal(modalTypes.SEND_MODAL, payload);
  }

  showStatus(formId, formName) {
    const urlType = 'statusUrl';
    const url = this.getUrl(urlType).replace('id', formId);

    const payload = statusFMConfig(formId, formName);

    this.props.showModal(modalTypes.MESSAGE_MODAL, payload);
  }

  render() {
    const {
      forms
    } = this.props;

    if (forms === undefined)
      return null;

    return (
      <div>
        <h3>Созданные формы:</h3>
        <Table
          columns={this.myColumns}
          data={forms.toJS()}
          name='form-list'
          number={false}
          onRowClick={(e, data) => {
            let target = e.target;

            console.log(target.classList);

            while (target.classList.contains(Table.classes.TABLE) === false) {
              console.log(target.className);

              if (target.classList.contains(ControlButtons.className)) {
                // нашли элемент, который нас не интересует!
                return;
              }
              target = target.parentNode;
            }

            this.redirectToPreviewPage(data.id);
          }}
        />
        {super.render()}
      </div>
    );
  }
}

MainPageApp.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    isFetching: state.formData.get('isFetching'),
    forms: state.formData.get('forms'),
    error: state.formData.get('error'),
    modal: state.modal
  };
};

const mapDispatchToProps = {
  fetchForms,
  showModal,
  hideModal,
  sendDeleteForm,
  sendCopyForm,
  sendForm
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageApp);