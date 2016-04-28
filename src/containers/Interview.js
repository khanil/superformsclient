import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import sendRequest from './../utils/sendRequest';
import getDataFromNode from './../utils/getDataFromNode';
import { fetchBoilerplate } from './../actions/actionsInterview';
import Header from './../components/interview/Header';
import Form from './../components/interview/Form';
import validate from './../utils/interviewValidation';

const fields = [
  'auth',
  'answers[]'
];

class Interview extends Component {// eslint-disable-line no-undef

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

  mySubmit = () => {

    // values - объект значений формы
    // url - адрес API на который отправляется форма
    const values = this.props.values;
    const url = this.url;

    const str = JSON.stringify(values, '', 2);
    console.log(str);

    sendRequest('POST', url, str, function (xhr) {
      console.log(xhr);
    })
    
  };

  render() {

    const {
      fields,
      name,
      description,
      questions,
      values,
      isFetching,
      handleSubmit
    } = this.props;

    const mySubmit = this.mySubmit;

    return (
      <div>

      { 
        ( isFetching ) 

        ?

        <div className='loading-spinner-center'>
          <i className='fa fa-spinner fa-spin fa-2x'></i>
          <span>Загрузка</span>
        </div>

        :

        <div>

          <Header name={name} description={description} />

          <Form
            fields={fields}
            questions={questions}
            values={values}
            handleSubmit={handleSubmit}
            submit={mySubmit} />

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
    initialValues: { answers : state.interview.boilerplate.questions.map( () => ('') ) }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBoilerplateHandler: (url) => {
      dispatch( fetchBoilerplate(url) );
    }
  }
}

export default reduxForm({
  form: 'interview',
  fields,
  touchOnChange: true,
  validate
}, mapStateToProps, mapDispatchToProps)(Interview);