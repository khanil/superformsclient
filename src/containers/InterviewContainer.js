import React, { Component } from 'react';
import { connect } from 'react-redux';
import getDataFromNode from './../utils/getDataFromNode';
import { fetchBoilerplate } from './../actions/actionsInterview';
import Interview from './Interview';
import Header from './../components/interview/Header';

class InterviewContainer extends Component {

  /*
    URL на который отправляется результат заполнения формы считывается из
    разметки, в элементе с id "info"
   */
  url;

  componentWillMount() {

    let data = getDataFromNode('info', ['getUrl', 'postUrl']);

    if ( data.fatalError ) {
      alert('Произошла ошибка при загрузке анкеты. Пожалуйста свяжитесь с техподдержкой.')
    } else {
      this.url = data.postUrl;
      //Запрос шаблона формы с сервера
      this.props.fetchBoilerplateHandler(data.getUrl);
    }

  }

  render() {

    const {
      fields,
      name,
      description,
      questions,
      isFetching
    } = this.props;

    const url = this.url;

    return (
      <div>
      {
        (isFetching) ?

        <div className='loading-spinner-center'>
          <i className='fa fa-spinner fa-spin fa-2x'></i>
          <span>Загрузка</span>
        </div>
        :
        <div>
          <Header name={name} description={description} />
          <Interview
            fields={fields}
            name={name}
            description={description}
            questions={questions}
            url={url}
          />
        </div>
      }
      </div>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    isFetching: state.interview.isFetching,
    questions: state.interview.boilerplate.questions,
    name: state.interview.boilerplate.name,
    description: state.interview.boilerplate.description,
    // initialValues: { answers : state.interview.boilerplate.questions.map( () => ('') ) },
    fields: ['Автор'].concat(state.interview.boilerplate.questions.map( ( question ) => ( question.title) ))
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBoilerplateHandler: (url) => {
      dispatch( fetchBoilerplate(url) );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewContainer)