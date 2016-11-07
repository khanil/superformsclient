import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppComponent from '../components/AppComponent';
import { bindFunctions } from '../utils';
import { removeFMConfig, copyFMConfig, statusFMConfig } from '../config';
import { modalTypes } from '../constants';
import Table from '../components/Table/Table';
import { formTypes } from '../constants';
import ControlButtons from '../components/ControlButtons';
import { createSelector } from 'reselect'
import ButtonGlyphicon from '../components/ButtonGlyphicon';
import Tabs from '../components/journal/Tabs';
import SearchBar from '../components/journal/SearchBar';
import Spinner from '../components/LoadingSpinner';
import * as myFormsList from '../redux/modules/myFormsList';
import * as allFormsList from '../redux/modules/allFormsList';
import * as modal from '../redux/modules/mainPageModal';
import * as appConfig from '../redux/modules/mainPageApp';


import Moment from 'moment';
Moment.locale('ru');
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);
const dateFormat = 'DD.MM.YYYY';
const timeFormat = 'HH:mm';

const ALL = 'ВСЕ ФОРМЫ';
const PERSONAL = 'МОИ ФОРМЫ';

export default class MainPageApp extends AppComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPersonalFetched: false
    }

    this.myColumnsALL = [
      {
        key: 'index',
        title: 'ID',
        sortFn: (a, b) => (b - a)
      },
      {
        key: 'author',
        title: 'Автор',
        renderCell: (value, data) => {
          const surname = data.surname;
          const name = data.name[0] + '.';
          const patronymic = data.patronymic ? (data.patronymic[0] + '.') : '';

          return `${surname} ${name} ${patronymic}`;
        }
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
          key: 'resp_count',
          title: 'Ответы',
          renderCell: (value, data) => {
            if (!data.sent)
              return 'Не отправлялось';
            if (value === null)
              return 0;
            return value;
          },
          sortFn: (a, b) => (b - a)
        },
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
            return (values[1] - values[0]);
          }
        }
      ],
      {
        key: 'control',
        title: '',
        renderCell: (value, data) => (
          <div className={`btn-group ${ControlButtons.className}`}>
            <ButtonGlyphicon
              icon='list-alt'
              onClick={this.redirectToResponsesPage.bind(null, data.id)}
              title='Просмотр ответов'/>
          </div>
        ),
        sort: false
      }
    ];

    this.myColumnsPERSONAL = [
      {
        key: 'index',
        title: 'ID',
        sortFn: (a, b) => (b - a)
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
          key: 'resp_count',
          title: 'Ответы',
          renderCell: (value, data) => {
            if (!data.sent)
              return 'Не отправлялось';
            if (value === null)
              return 0;
            return value;
          },
          sortFn: (a, b) => (b - a)
        },
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

    this.tabs = [ALL, PERSONAL];

    this.tableSpinner = (
      <Spinner
        iconSize='lg'
      />
    );

    bindFunctions.call(this, ['redirectToResponsesPage', 'redirectToEditPage',
      'redirectToPreviewPage', 'remove', 'copy', 'send', 'showStatus',
      'tableRowClickHandler', 'tabClickHandler']);
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

    const submitHandler = (value) => (this.props.sendCopyForm(formId, value));

    const payload = copyFMConfig;
    payload.label = `Введите название для копии формы "${name}"`;
    payload.submitHandler = submitHandler;

    this.props.showModal(modalTypes.SINGLE_INPUT_MODAL, payload);
  }

  remove(formId) {
    const urlType = 'deleteUrl';
    const url = this.getUrl(urlType).replace('id', formId);

    const confirmHandler = this.props.sendDeleteForm.bind(this, formId);

    const payload = removeFMConfig;
    payload.confirmHandler = confirmHandler;

    this.props.showModal(modalTypes.CONFIRM_MODAL, payload);
  }

  send(formId) {
    const urlType = 'sendUrl';
    const url = this.getUrl(urlType).replace('id', formId);

    const sendHandler = (config) => this.props.sendForm(formId, config);

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

  tabClickHandler(tab) {
    const currTableMode = this.props.tab;
    if (currTableMode === tab)
      return;

    if (tab === ALL) {
      const urlType = 'getAllUrl';
      const url = this.getUrl(urlType);
      this.props.fetchAllForms(url);
    } else {
      if (this.state.isPersonalFetched == false) {
        this.props.fetchPersonalForms();
        this.setState({
          isPersonalFetched: true
        });
      }
    }

    this.props.tabChange(tab);
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

  componentWillMount() {
    const tab = this._extraData['tab'] || this.props.tab;

    this.props.tabInit(tab);

    if (tab == ALL) {
      this.props.fetchAllForms();
    } else {
      this.props.fetchPersonalForms();
      this.setState({
        isPersonalFetched: true
      });
    }
  }

  render() {
    const {
      applySearchFilter,
      aForms,
      pForms,
      aFetching,
      pFetching
    } = this.props;

    if (pForms === undefined)
      return null;

    const tableMode = this.props.tab;

    const pTableStyle = tableMode === PERSONAL ? null : {'display' : 'none'};
    const aTableStyle = tableMode === ALL ? null : {'display' : 'none'};

    return (
      <div>

        <Tabs
          active={tableMode}
          className={'nav-pretable'}
          clickHandler={this.tabClickHandler}
          tabs={this.tabs}
        />

        <div style={aTableStyle}>
          <SearchBar
            onSearch={applySearchFilter}
          />

          <Table
            columns={this.myColumnsALL}
            data={aForms}
            defaultSortBy={'index'}
            emptyDataMessage={
              aFetching ?
              this.tableSpinner :
              null
            }
            name='journal'
            onRowClick={this.tableRowClickHandler}
          />
        </div>
        <div style={pTableStyle}>
          <Table
            columns={this.myColumnsPERSONAL}
            data={pForms}
            defaultSortBy={'index'}
            emptyDataMessage={
              pFetching ?
              this.tableSpinner :
              null
            }
            name='form-list'
            onRowClick={this.tableRowClickHandler}
          />
        </div>
        {super.render()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    aFetching: allFormsList.getStatus(state.app.allFormsList),
    pFetching: myFormsList.getStatus(state.app.myFormsList),
    aForms: allFormsList.isFilterEmpty(state.app.allFormsList) ?
      allFormsList.getForms(state.app.allFormsList) :
      allFormsList.getFormsFilteredByUser(state.app.allFormsList),
    pForms: myFormsList.getForms(state.app.myFormsList),
    error: null,
    tab: appConfig.getTab(state.app),
    modal: modal.getModal(state.modal)
  };
};

const mapDispatchToProps = {
  applySearchFilter: allFormsList.filter,
  fetchAllForms: allFormsList.fetch,
  fetchPersonalForms: myFormsList.fetch,
  showModal: modal.show,
  hideModal: modal.hide,
  sendDeleteForm: myFormsList.remove,
  sendCopyForm: myFormsList.copy,
  sendForm: myFormsList.send,
  tabChange: appConfig.tabChange,
  tabInit: appConfig.tabInit
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageApp);

