import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import getDataFromNode from './../utils/getDataFromNode';

import { fetchForms } from './../actions/actionsFormsList';
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

class FormsList extends Component {

  urls;

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
      hideStatusModalHandler
    } = this.props;

    const urls = this.urls;

    return (
      <div className='forms-list'>
        {
          (isFetching) ?
          <LoadingSpinner /> :
          <table className='table table-hover'>
          <thead>
            <tr>
              <th>Название</th>
              <th>Тип</th>
              <th>Дата изменения</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              forms.map( (form, i) => (
                <FormRow
                  urls={urls}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.formsList.filter,
    sort: state.formsList.sort,
    forms: state.formsList.forms,
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