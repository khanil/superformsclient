import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import { ANSWER_REVIEW, PREVIEW_FORM } from './../../constants/interviewPageTypes';

import * as formTypes from './../../constants/formTypes';

import Moment from 'moment';
Moment.locale('ru');
const format = 'DD/MM/YY HH:mm';

class InterviewHeader extends Component {

  render() {

    const {
      pageType,
      formType,
      name,
      created,
      edited,
      sent,
      expires,
      author,
      received
    } = this.props;

    const col = (pageType === ANSWER_REVIEW) ?
                'col-md-12 col-lg-12' :
                'col-md-9 col-lg-9';

    return (
      <div className='row'>

        <div className={col + ' page-header-info'}>
          <div className='col-md-6 col-sm-6'>
            <p>{formType}</p>
            <p>{name}</p>
          </div>
          {
            pageType === PREVIEW_FORM ?
              sent ?
              <div className='col-md-6 col-sm-6'>
                <p>{'Отправлено: ' + Moment(sent).format(format)}</p>
                {
                  expires ?
                  <p>{'Окончание: ' + Moment(expires).format(format)}</p> :
                  null
                }
              </div>
              :
              <div className='col-md-6 col-sm-6'>
                <p>{'Создано: ' + Moment(created).format(format)}</p>
                <p>{'Отредактировано: ' + Moment(edited).format(format)}</p>
              </div>
            :
            null
          }

          {
            pageType === ANSWER_REVIEW ?
              <div className='col-md-6 col-sm-6'>
                <p>{'Рецензент: ' + author}</p>
                <p>{'Дата ответа: ' + Moment(received).format(format)}</p>
              </div>
              :
              null
          }
        </div>

        {/*Блок с кнопками*/}
        {
          pageType === ANSWER_REVIEW ?
          null :
          <div className='col-md-3 col-lg-3 page-header-btns'>
            <div className='pull-right'>
              <div className='btn-group' role='group' aria-label='...'>
                <OverlayTrigger
                  placement='bottom'
                  overlay={<Tooltip>Скопировать</Tooltip>}
                >
                  <button
                    type='button'
                    className='btn btn-default'
                  >
                    <i className='fa fa-clone' aria-hidden='true'></i>
                  </button>
                </OverlayTrigger>

                {
                  sent ? 
                  <div className='btn-group' role='group' aria-label='...'>
                    <OverlayTrigger
                    placement='bottom'
                    overlay={<Tooltip>Ход мониторинга</Tooltip>}
                    >
                      <button
                        type='button'
                        className='btn btn-default'
                      >
                        <span className='glyphicon glyphicon-stats' aria-hidden='true'></span>
                      </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement='bottom'
                      overlay={<Tooltip>Просмотр ответов</Tooltip>}
                    >
                      <button
                        type='button'
                        className='btn btn-default'
                      >
                        <span className='glyphicon glyphicon-list-alt' aria-hidden='true'></span>
                      </button>
                    </OverlayTrigger>
                  </div> :
                  null
                }

              </div>
            </div>
          </div>
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageType: state.page.type,
    formType: state.boilerplate.type ? formTypes[state.boilerplate.type.toUpperCase()].label : null,
    name: state.boilerplate.name,
    created: state.boilerplate.created,
    edited: state.boilerplate.edited,
    sent: state.boilerplate.sent,
    expires: state.boilerplate.expires,
    author: state.responce.author,
    received: state.responce.received
  }
};

const mapDispatchToProps = () => {
  return {
  }
};

export default connect(
mapStateToProps,
mapDispatchToProps
)(InterviewHeader);