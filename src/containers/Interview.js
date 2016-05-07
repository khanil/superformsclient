import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import sendRequest from './../utils/sendRequest';
import Form from './../components/interview/Form';
import validate from './../utils/interviewValidation';

// const fields = [
//   'auth',
//   'answers[]'
// ];

class Interview extends Component {

  mySubmit = () => {

    // values - объект значений формы
    // url - адрес API на который отправляется форма
    const values = this.props.values;
    const url = this.props.url;

    const str = JSON.stringify(values, '', 2);
    console.log(str);

    sendRequest('POST', url, str, function (xhr) {
      console.log(xhr);
    })
    
  };

  render() {

    const {
      fields,
      questions,
      handleSubmit
    } = this.props;

    const mySubmit= this.mySubmit;

    return (
      <div>

        <Form
          fields={fields}
          questions={questions}
          handleSubmit={handleSubmit}
          submit={mySubmit}
        />

      </div>
    );

  }

}

export default reduxForm({
  form: 'interview',
  touchOnChange: true,
  validate
})(Interview);