import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';
import { bindFunctions } from '../utils';
import { fetchForms, showModal, hideModal, sendDeleteForm, sendCopyForm, sendForm} from '../actions';
import { removeFMConfig, copyFMConfig, statusFMConfig } from '../config';
import { modalTypes } from '../constants';
import Table from '../components/Table/Table';
import { formTypes } from '../constants';
import ControlButtons from '../components/ControlButtons';
import { createSelector } from 'reselect'
import forms from '../components/Table/formsJSON';
import ButtonGlyphicon from '../components/ButtonGlyphicon';

import Moment from 'moment';
Moment.locale('ru');
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);
const dateFormat = 'DD.MM.YYYY';
const timeFormat = 'HH:mm';

const [ALL, PERSONAL] = [0, 1];

export default class MainPageApp extends AppComponent {
  constructor(props) {
    super(props);

    this.state = {
      tableMode: PERSONAL
    }

    this.myColumns = [
      {
        key: 'index',
        title: 'ID'
      },
      {
        key: 'title',
        title: 'Название'
      },
      {
        key: 'type',
        title: 'Назначение',
        renderCell: (value) => (formTypes[value.toUpperCase()].label),
        sortFn: (a, b) => {
          const [a_label, b_label] = [formTypes[a.toUpperCase()].label, formTypes[b.toUpperCase()].label];
          if (a_label < b_label) return 1;
          if (a_label > b_label) return -1;
        }
      },
      [
        {
          key: 'created',
          title: 'Создано',
          renderCell: (value) => (Moment(value).format(`${dateFormat} ${timeFormat}`)),
          sortFn: (a, b) => {
            const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
            return (values[1] - values[0]);
          }
        },
        {
          key: 'edited',
          title: 'Отредактировано',
          renderCell: (value) => (value ? Moment(value).format(`${dateFormat} ${timeFormat}`) : 'Не редактировалось'),
          sortFn: (a, b) => {
            const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
            return (values[1] - values[0]);
          }
        }
      ],
      [
        {
          key: 'sent',
          title: 'Отправлено',
          renderCell: (value) => (value ? Moment(value).format(`${dateFormat} ${timeFormat}`) : 'Не отправлялось'),
          sortFn: (a, b) => {
            const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
            return (values[1] - values[0]);
          }
        },
        {
          key: 'expires',
          title: 'Истекает',
          renderCell: (value, data) => {
            if (!data.sent)
              return 'Не отправлялось';
            if (value) {
              return Moment(value).format(`${dateFormat} ${timeFormat}`);
            } else {
              return 'Не истекает';
            }
          },
          sortFn: (a, b) => {
            const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
            console.log(values);
            return (values[1] - values[0]);
          }
        }
      ],
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

    // this.myColumnsALL = [
    //   {
    //     key: 'index',
    //     title: 'ID',
    //     sortFn: (a, b) => (b - a)
    //   },
    //   {
    //     key: 'author',
    //     title: 'Автор',
    //     renderCell: (value, data) => {
    //       const surname = data.surname;
    //       const name = data.name[0] + '.';
    //       const patronymic = data.patronymic ? (data.patronymic[0] + '.') : '';

    //       return `${surname} ${name} ${patronymic}`;
    //     }
    //   },
    //   {
    //     key: 'title',
    //     title: 'Название'
    //   },
    //   {
    //     key: 'type',
    //     title: 'Назначение',
    //     renderCell: (value) => (formTypes[value.toUpperCase()].label),
    //     sortFn: (a, b) => {
    //       const [a_label, b_label] = [formTypes[a.toUpperCase()].label, formTypes[b.toUpperCase()].label];
    //       if (a_label < b_label) return 1;
    //       if (a_label > b_label) return -1;
    //     }
    //   },
    //   [
    //     {
    //       key: 'created',
    //       title: 'Создано',
    //       renderCell: (value) => (Moment(value).format(`${dateFormat} ${timeFormat}`)),
    //       sortFn: (a, b) => {
    //         const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
    //         return (values[1] - values[0]);
    //       }
    //     },
    //     {
    //       key: 'edited',
    //       title: 'Отредактировано',
    //       renderCell: (value) => (value ? Moment(value).format(`${dateFormat} ${timeFormat}`) : 'Не редактировалось'),
    //       sortFn: (a, b) => {
    //         const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
    //         return (values[1] - values[0]);
    //       }
    //     }
    //   ],
    //   [
    //     {
    //       key: 'sent',
    //       title: 'Отправлено',
    //       renderCell: (value) => (value ? Moment(value).format(`${dateFormat} ${timeFormat}`) : 'Не отправлялось'),
    //       sortFn: (a, b) => {
    //         const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
    //         return (values[1] - values[0]);
    //       }
    //     },
    //     {
    //       key: 'expires',
    //       title: 'Истекает',
    //       renderCell: (value, data) => {
    //         if (!data.sent)
    //           return 'Не отправлялось';
    //         if (value) {
    //           return Moment(value).format(`${dateFormat} ${timeFormat}`);
    //         } else {
    //           return 'Не истекает';
    //         }
    //       },
    //       sortFn: (a, b) => {
    //         const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
    //         return (values[1] - values[0]);
    //       }
    //     },
    //     {
    //       key: 'resp_count',
    //       title: 'Ответы',
    //       renderCell: (value, data) => {
    //         if (!data.sent)
    //           return 'Не отправлялось';
    //         if (value === null)
    //           return 0;
    //         return value;
    //       },
    //       sortFn: (a, b) => (b - a)
    //     }
    //   ],
    //   {
    //     key: 'control',
    //     title: '',
    //     renderCell: (value, data) => (
    //       <div className={`btn-group ${ControlButtons.className}`}>
    //         <ButtonGlyphicon
    //           icon='list-alt'
    //           onClick={this.redirectToResponsesPage.bind(null, data.id)}
    //           title='Просмотр ответов'/>
    //       </div>
    //     )
    //   }
    // ];

    // this.myColumnsPERSONAL = [
    //   {
    //     key: 'index',
    //     title: 'ID',
    //     sortFn: (a, b) => (b - a)
    //   },
    //   {
    //     key: 'title',
    //     title: 'Название'
    //   },
    //   {
    //     key: 'type',
    //     title: 'Назначение',
    //     renderCell: (value) => (formTypes[value.toUpperCase()].label),
    //     sortFn: (a, b) => {
    //       const [a_label, b_label] = [formTypes[a.toUpperCase()].label, formTypes[b.toUpperCase()].label];
    //       if (a_label < b_label) return 1;
    //       if (a_label > b_label) return -1;
    //     }
    //   },
    //   [
    //     {
    //       key: 'created',
    //       title: 'Создано',
    //       renderCell: (value) => (Moment(value).format(`${dateFormat} ${timeFormat}`)),
    //       sortFn: (a, b) => {
    //         const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
    //         return (values[1] - values[0]);
    //       }
    //     },
    //     {
    //       key: 'edited',
    //       title: 'Отредактировано',
    //       renderCell: (value) => (value ? Moment(value).format(`${dateFormat} ${timeFormat}`) : 'Не редактировалось'),
    //       sortFn: (a, b) => {
    //         const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
    //         return (values[1] - values[0]);
    //       }
    //     }
    //   ],
    //   [
    //     {
    //       key: 'sent',
    //       title: 'Отправлено',
    //       renderCell: (value) => (value ? Moment(value).format(`${dateFormat} ${timeFormat}`) : 'Не отправлялось'),
    //       sortFn: (a, b) => {
    //         const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
    //         return (values[1] - values[0]);
    //       }
    //     },
    //     {
    //       key: 'expires',
    //       title: 'Истекает',
    //       renderCell: (value, data) => {
    //         if (!data.sent)
    //           return 'Не отправлялось';
    //         if (value) {
    //           return Moment(value).format(`${dateFormat} ${timeFormat}`);
    //         } else {
    //           return 'Не истекает';
    //         }
    //       },
    //       sortFn: (a, b) => {
    //         const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
    //         return (values[1] - values[0]);
    //       }
    //     },
    //     {
    //       key: 'resp_count',
    //       title: 'Ответы',
    //       renderCell: (value, data) => {
    //         if (!data.sent)
    //           return 'Не отправлялось';
    //         if (value === null)
    //           return 0;
    //         return value;
    //       },
    //       sortFn: (a, b) => (b - a)
    //     }
    //   ],
    //   {
    //     key: 'control',
    //     title: '',
    //     renderCell: (value, data) => (
    //       <ControlButtons
    //         isFormSent={data.sent !== null}
    //         edit={this.redirectToEditPage.bind(null, data.id)}
    //         showStatus={this.showStatus.bind(null, data.id, data.title)}
    //         showResponses={this.redirectToResponsesPage.bind(null, data.id)}
    //         remove={this.remove.bind(null, data.id)}
    //         copy={this.copy.bind(null, data.id, data.title)}
    //         send={this.send.bind(null, data.id)}
    //       />
    //     ),
    //     sort: false
    //   }
    // ];

    bindFunctions.call(this, ['redirectToResponsesPage', 'redirectToEditPage',
      'redirectToPreviewPage', 'remove', 'copy', 'send', 'showStatus',
      'tableRowClickHandler', 'radioClickHandler']);
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

  tableRowClickHandler(e, data) {
    let target = e.target;

    while (target.classList.contains(Table.classes.TABLE) === false) {
      if (target.classList.contains(ControlButtons.className)) {
        return;
      }
      target = target.parentNode;
    }

    this.redirectToPreviewPage(data.id);
  }

  radioClickHandler(mode) {
    const currTableMode = this.state.tableMode;
    if (currTableMode === mode)
      return;
    this.setState({
      tableMode: mode
    });
  }

  componentWillUpdate() {
    console.time('page');
  }

  componentDidUpdate() {
    console.timeEnd('page');
  }

  render() {
    const {
      forms
    } = this.props;

    if (forms === undefined)
      return null;

    const tableMode = this.state.tableMode;
    console.log(tableMode);

    const pTableStyle = tableMode === PERSONAL ? null : {'display' : 'none'};
    const aTableStyle = tableMode === ALL ? null : {'display' : 'none'};

    return (
      <div>
        {/*<div className='form-group'>
          <div className="checkbox">
            <label>
              <input
                type="radio"
                checked={tableMode === ALL}
                onChange={this.radioClickHandler.bind(null, ALL)}
              /> ALL
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="radio"
                checked={tableMode === PERSONAL}
                onChange={this.radioClickHandler.bind(null, PERSONAL)}
              /> PERSONAL
            </label>
          </div>
        </div>*/}
        <h3>Созданные формы:</h3>
        <Table
          columns={this.myColumns}
          data={forms}
          defaultSortBy={'resp_count'}
          name='form-list'
          onRowClick={this.tableRowClickHandler}
        />
        {/*<div style={aTableStyle}>
          <Table
            columns={this.myColumnsALL}
            data={forms}
            defaultSortBy={'resp_count'}
            name='journal'
            onRowClick={this.tableRowClickHandler}
          />
        </div>
        <div style={pTableStyle}>
          <Table
            columns={this.myColumnsPERSONAL}
            data={forms}
            defaultSortBy={'edited'}
            name='form-list'
            onRowClick={this.tableRowClickHandler}
          />
        </div>*/}
        {super.render()}
      </div>
    );
  }
}

const getForms = createSelector(
  (state) => state.formData.get('forms'),
  (forms) => {
    if (forms === undefined)
      return forms;
    return forms.toJS();
  }
);

const mapStateToProps = (state) => {
  return {
    isFetching: state.formData.get('isFetching'),
    forms: getForms(state),
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

