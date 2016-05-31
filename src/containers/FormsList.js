import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// import {SENT, CREATED, EDITED} from './../constants/displayingDateTypes';

import getDataFromNode from './../utils/getDataFromNode';

import { fetchForms, setDateToDisplay, setFilter } from './../actions/actionsFormsList';
import { showModal as showSendModal, hideModal as hideSendModal } from './../actions/actionsSendModal';
import { showModal as showDeleteModal, hideModal as hideDeleteModal } from './../actions/actionsDeleteModal';
import { showModal as showStatusModal, hideModal as hideStatusModal } from './../actions/actionsStatusModal';
import { toggleModal } from './../actions/actionsCopyModal';

import FormRow from './../components/formsList/FormRow';
import LoadingSpinner from './../components/widgets/LoadingSpinner';
import SendFormModal from './../components/widgets/SendFormModal';
import CopyFormModal from './../components/widgets/CopyFormModal';
import DeleteFormModal from './../components/widgets/DeleteFormModal';
import FormStatusModal from './../components/widgets/FormStatusModal';
import Dropdown from './../components/widgets/Dropdown';
import DropdownDouble from './../components/widgets/DropdownDouble';

class FormsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    };

    this.urls;

    this.dateOptions = {
      SENT: 'Дата отправки',
      CREATED: 'Дата создания',
      EDITED: 'Дата изменения'
    }

    this.filterOptions = {
      'По типу формы': {
        ALL: 'Все',
        MONITORING: 'Мониторинг',
        VOTING: 'Голосование',
        INTERVIEW: 'Опрос',
        SURVEY: 'Анкетирование'
      },
      'По статусу': {
        ALL: 'Все',
        SENT: 'Отправленные',
        UNSENT: 'Неотправленные'
      }
    }
  }

  componentWillMount() {

    let data = getDataFromNode('info', [
      'getUrl',
      'copyUrl',
      'deleteUrl',
      'editUrl',
      'previewUrl',
      'reportUrl',
      'sendUrl',
      'statusUrl']
    );

    if ( data.fatalError ) {
      alert('Произошла ошибка при загрузке анкеты. Пожалуйста свяжитесь с техподдержкой.')
    } else {
      //Запрос шаблона формы с сервера
      this.props.fetchFormsHandler(data.getUrl);
    }

    this.urls = data;

  }

  render() {

    const {
      forms,
      filters,
      displayingDate,
      isFetching,
      isSendModalVisible,
      isCopyModalVisible,
      isDeleteModalVisible,
      isStatusModalVisible,
      showSendModalHandler,
      hideSendModalHandler,
      toggleCopyModalHandler,
      showDeleteModalHandler,
      hideDeleteModalHandler,
      showStatusModalHandler,
      hideStatusModalHandler,
      setDateToDisplayHandler,
      setFilterHandler
    } = this.props;

    const urls = this.urls;

    return (
      <div className='forms-list-container'>

      <div className='row pull-right'>
        <DropdownDouble
          classList='col-md-6'
          btnClassList='btn btn-default'
          options={this.filterOptions}
          changeHandler={setFilterHandler}
          selected={filters} />
      </div>

      <div className='forms-list'>
        {
          (isFetching) ?
          <LoadingSpinner /> :
          <table className='table table-hover'>
          <thead>
            <tr>
              <th>Название</th>
              <th>Тип</th>
              <th>
                {/* Дата */}
                <Dropdown 
                  options={this.dateOptions}
                  changeHandler={setDateToDisplayHandler}
                  selected={displayingDate} />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              forms.map( (form, i) => (
                <FormRow
                  urls={urls}
                  displayingDate={displayingDate}
                  key={i}
                  form={form}
                  showSendModal={showSendModalHandler}
                  toggleCopyModal={toggleCopyModalHandler}
                  showDeleteModal={showDeleteModalHandler}
                  showStatusModal={showStatusModalHandler}
                />
              ))
            }
          </tbody>
        </table>
        }

        {
          isSendModalVisible ?
          <SendFormModal
            hideHandler={hideSendModalHandler}
            url={urls.sendUrl}
            successFunc={() => {this.props.fetchFormsHandler(urls.getUrl)}}
          /> :
          null
        }

        {
          isCopyModalVisible ?
          <CopyFormModal
            hideHandler={toggleCopyModalHandler}
            url={urls.copyUrl}
            successFunc={() => {this.props.fetchFormsHandler(urls.getUrl)}}
          /> :
          null
        }

        {
          isDeleteModalVisible ?
          <DeleteFormModal
            hideHandler={hideDeleteModalHandler}
            url={urls.deleteUrl}
            successFunc={() => {this.props.fetchFormsHandler(urls.getUrl)}}
          /> :
          null
        }

        {
          isStatusModalVisible ?
          <FormStatusModal
            hideHandler={hideStatusModalHandler}
          /> :
          null
        }

      </div>
      </div>
    );
  }
}

const applyTypeFilter = (forms, filter) => {
  if (filter === 'ALL') return forms;

  return forms.filter((form) => (
    form.type.toUpperCase() === filter
  ));
}

const applySentFilter = (forms, filter) => {
  if (filter === 'ALL') return forms;

  switch (filter) {
    case 'SENT':
      return forms.filter((form) => (
        form.sent !== undefined && form.sent !== null
      ));
    case 'UNSENT':
      return forms.filter((form) => (
        form.sent == undefined || form.sent == null
      ));
  }
}

const applyFilters = (forms, filters) => {
  let result = forms;
  result = applyTypeFilter(result, filters['По типу формы']);
  result = applySentFilter(result, filters['По статусу']);
  return result;
}

const mapStateToProps = (state) => {
  return {
    filters: state.formsList.filters,
    sort: state.formsList.sort,
    displayingDate: state.formsList.displayingDate,
    forms: applyFilters(state.formsList.forms, state.formsList.filters),
    isFetching: state.formsList.isFetching,
    isSendModalVisible: state.sendModal.isVisible,
    isCopyModalVisible: state.copyModal.isVisible,
    isDeleteModalVisible: state.deleteModal.isVisible,
    isStatusModalVisible: state.statusModal.isVisible
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFormsHandler: (url) => {
      dispatch( fetchForms(url) )
    },
    showSendModalHandler: (id) => {
      dispatch( showSendModal(id) )
    },
    hideSendModalHandler: () => {
      dispatch( hideSendModal() )
    },
    toggleCopyModalHandler: (id) => {
      dispatch( toggleModal(id) )
    },
    showDeleteModalHandler: (id) => {
      dispatch( showDeleteModal(id) )
    },
    hideDeleteModalHandler: () => {
      dispatch( hideDeleteModal() )
    },
    showStatusModalHandler: (id) => {
      dispatch( showStatusModal(id) )
    },
    hideStatusModalHandler: () => {
      dispatch( hideStatusModal() )
    },
    setDateToDisplayHandler: (type) => {
      dispatch( setDateToDisplay(type) )
    },
    setFilterHandler: (filter, value) => {
      dispatch( setFilter(filter, value) )
    }
  }
};

FormsList.propTypes = {
  fetchFormsHandler: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormsList)