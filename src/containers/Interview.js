import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import sendRequest from './../utils/sendRequest';
import getDataFromNode from './../utils/getDataFromNode';
import { fetchBoilerplate } from './../actions/actionsInterview';
import Header from './../components/interview/Header';
import Form from './../components/interview/Form';

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
      this.props.fetchBoilerplateHandler(data.getUrl);
    }

  }

  render() {

    const {
      fields,
      name,
      description,
      questions,
      values,
      isFetching
    } = this.props;

    const url = this.url;

    const handleSubmit = (e) => {

      e.preventDefault();

      const str = JSON.stringify(values, '', 2);
      console.log(str);

      sendRequest('POST', url, str, function (xhr) {
        console.log(xhr);
      })
      
    };

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
            handleSubmit={handleSubmit} />

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
    initialValues: { answers : state.interview.boilerplate.questions.map(() => { return '' } ) }
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
  fields
}, mapStateToProps, mapDispatchToProps)(Interview);