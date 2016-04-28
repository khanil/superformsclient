import React, {Component} from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import getDataFromNode from './../utils/getDataFromNode';
import { fetchData } from './../actions/actionsReport';

class Report extends Component {

  componentWillMount() {

    let data = getDataFromNode('info', ['getUrl']);

    if ( data.fatalError ) {
      alert('Произошла ошибка при загрузке анкеты. Пожалуйста свяжитесь с техподдержкой.')
    } else {
      //Запрос шаблона формы с сервера
      this.props.fetchDataHandler(data.getUrl);
    }

  }

  rows = [
    {
        id: 1,
        name: 'Product1',
        price: 120,
        x: 100,
        y: 12,
        z: 'OLOLOL'
    },{
        id: 2,
        name: 'Product2',
        price: 80,
        x: 100,
        y: 12,
        z: 'OLOLOL'
    }
  ];

  render() {

    const {
      isFetching,
      header,
      answers
    } = this.props;

    // let header = [
    //   {
    //     id: 'author',
    //     name: 'ФИО'
    //   }
    // ];

    // let headerFromBoilerplate = boilerplate.questions.map( (question) => {
    //   return (
    //     {
    //       id: question.title,
    //       name: question.title
    //     }
    //   );
    // });

    // header = header.concat(headerFromBoilerplate);

    console.log(header);

    console.log(answers);

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

          <BootstrapTable data={answers} striped={true} hover={true}>
            {
              header.map( (obj, index) => (
                <TableHeaderColumn
                  isKey={index === 0}
                  dataField={obj.id}
                  key={index}
                  width='300'
                  dataSort={true}>{obj.name}</TableHeaderColumn>
              ))
            }
          </BootstrapTable>

        </div>
      }
      
      </div>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    isFetching: state.report.isFetching,
    header: state.report.header,
    answers: state.report.answers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataHandler: (url) => {
      dispatch( fetchData(url) );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);
