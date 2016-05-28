import React, { Component } from 'react';
import UnsentFormButtons from './UnsentFormButtons';
import SentFormButtons from './SentFormButtons';
import MultyPurposeButtons from './MultyPurposeButtons';
import * as formTypes from './../../constants/formTypes';
import moment from 'moment';
moment.locale('ru');

class FormRow extends Component {

  openPreviewPageHandler = (event) => {
    var target = event.target;
    var currentTarget = event.currentTarget;
    var id = this.props.form.id;

    //Отбросить обработку нажатий на кнопки
    while (target != currentTarget) {
      if ( target.classList.contains('btn-group') ) {
        return;
      }

      target = target.parentNode;
    }

    var adds = this.props.urls.previewUrl.replace('id', id);

    document.location.pathname = adds;
  }

  openAnswersPageHandler = () => {
    const id = this.props.form.id;

    var adds = this.props.urls.reportUrl.replace('id', id);

    window.open(window.location.origin + adds, '_blank');
  }

  openEditPageHandler = () => {
    const id = this.props.form.id;

    var adds = this.props.urls.editUrl.replace('id', id);

    document.location.pathname = adds;
  }

  render() {

    const {
      showSendModal,
      toggleCopyModal,
      showDeleteModal,
      showStatusModal,
      form: {
        id,
        name,
        type,
        created = null,
        edited = null,
        sent = null
      }
    } = this.props;

    const openPreviewPageHandler = this.openPreviewPageHandler;
    const openAnswersPageHandler = this.openAnswersPageHandler;
    const openEditPageHandler = this.openEditPageHandler;

    return (
      <tr onClick={openPreviewPageHandler}>
      <td>{name}</td>
      <td>{formTypes[type.toUpperCase()].label}</td>
      <td>
        {
          edited ?
          moment(edited).format('DD/MM/YY HH:mm') :
          moment(created).format('DD/MM/YY HH:mm')
        }
      </td>
      <td>
        <MultyPurposeButtons
          openCopyModal={() => {toggleCopyModal(id)}}
          openDeleteModal={() => {showDeleteModal(id)}}
        >
          {
            sent ?
            <SentFormButtons
              showStatusModal={() => {showStatusModal(id)}}
              openAnswersPage={openAnswersPageHandler}
            /> :
            <UnsentFormButtons 
              showSendModal={() => {showSendModal(id)}}
              editForm={openEditPageHandler}
            />
          }
        </MultyPurposeButtons>
      </td>
    </tr>
    );
  }
}

export default FormRow;