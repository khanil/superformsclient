import React, { Component } from 'react';
import { connect } from 'react-redux';
import getDataFromNode from './../utils/getDataFromNode';
import { fetchBoilerplate, fetchResponce, setPageType, sendResponse } from './../actions/actionsInterview';
import InterviewForm from './../components/interview/InterviewForm';
import Header from './../components/interview/Header';
import LoadingSpinner from './../components/widgets/LoadingSpinner';
// import sendRequest from './../utils/sendRequest';
import {getValues} from 'redux-form';
import { ANSWER_REVIEW, INTERVIEW_FORM } from './../constants/interviewPageTypes';//PREVIEW_FORM, 


class Interview extends Component {

  /*
    URL на который отправляется результат заполнения формы считывается из
    разметки, в элементе с id 'info'
   */
  url;
  redirectUrl;

  componentWillMount() {

    let data = getDataFromNode('info', ['type', 'getUrl']);

    if ( data.fatalError ) {
      alert('Произошла ошибка при загрузке анкеты. Пожалуйста свяжитесь с техподдержкой.')
    } else {
      this.props.setPageTypeHandler(data.type);

      if (data.type === INTERVIEW_FORM) {
        document.body.classList.add('no-header');

        let additionalData = getDataFromNode('info', ['postUrl', 'redirectUrl']);

        if (additionalData.fatalError) {
          alert('Не указан postUrl или redirectUrl. Пожалуйста свяжитесь с техподдержкой.');
          return;
        } else {
          //Запрос ответа на форму с сервера
          this.url = additionalData.postUrl;
          this.redirectUrl = additionalData.redirectUrl;
        }
      }

      //Запрос шаблона формы с сервера
      this.props.fetchBoilerplateHandler(data.getUrl);

      if (data.type === ANSWER_REVIEW) {
        let additionalData = getDataFromNode('info', ['responseUrl']);

        if (additionalData.fatalError) {
          alert('Произошла ошибка при загрузке анкеты. Пожалуйста свяжитесь с техподдержкой.')
        } else {
          //Запрос ответа на форму с сервера
          this.props.fetchResponceHandler(additionalData.responseUrl);
        }
      }
    }

  }

  handleSubmit = () => {
    this.refs.interviewForm.submit();
  }

  submitResponces = () => {

    // values - объект значений формы
    // url - адрес API на который отправляется форма
    const values = this.props.formValues;
    const url = this.url;
    const redirectUrl = this.redirectUrl;

    const str = JSON.stringify(values, '', 2);

    const onSuccess = () => {
      document.location.pathname = redirectUrl;
    }

    this.props.sendResponseHandler(str, url, onSuccess);
  };

  render() {

    const {
      fields,
      name,
      description,
      questions,
      isFetching,
      pageType,
      initialValues
    } = this.props;

    return (
      <div>
      {
        (isFetching) ?
        <LoadingSpinner /> :
        <div>
          <Header
            name={name}
            description={description}
          />

          <InterviewForm
            ref='interviewForm'
            fields={fields}
            questions={questions}
            initialValues={initialValues}
            onSubmit={this.submitResponces}
            readonly={(pageType === ANSWER_REVIEW) ? true : false}
          />

          {
            //Активировать отправку формы на сервер в случае если страница
            //отрабатывает сценарий заполнения опроса
            (pageType === INTERVIEW_FORM)
            ? <button
              type='submit'
              className='btn btn-primary btn-block'
              onClick={this.handleSubmit}
            >
              Отправить
            </button>
            : null
          }
        </div>
      }
      </div>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    isFetching: state.page.isFetching,
    questions: state.boilerplate.questions,
    name: state.boilerplate.name,
    description: state.boilerplate.description,
    formValues: getValues(state.form.interview),
    pageType: state.page.type,
    fields: ['Автор'].concat(state.boilerplate.questions.map( ( question ) => ( question.title) )),
    initialValues: state.responce.answers
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBoilerplateHandler: (url) => {
      dispatch( fetchBoilerplate(url) );
    },
    fetchResponceHandler: (url) => {
      dispatch( fetchResponce(url) );
    },
    setPageTypeHandler: (type) => {
      dispatch( setPageType(type) );
    },
    sendResponseHandler: (json, url, onSuccess) => {
      dispatch( sendResponse(json, url, onSuccess) );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interview)