import React, {Component} from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import getDataFromNode from './../utils/getDataFromNode';
import { fetchData, showReportGeneration, hideReportGeneration, toggleDescription } from './../actions/actionsReport';
import ReportGeneration from './ReportGeneration';
import LoadingSpinner from './../components/widgets/LoadingSpinner';
import { INTEGER, FLOAT } from './../constants/questionTypes';

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

  isColumnTypeNumber(type) {
    return ( type === INTEGER.value || type === FLOAT.value);
  }

  render() {

    const {
      isDescriptionVisible,
      isFetching,
      isGenerationVisible,
      header,
      answers,
      formTitle,
      formDescription,
      toggleDescriptionHandler,
      showGenerationHandler,
      hideGenerationHandler
    } = this.props;

    const isColumnTypeNumber = this.isColumnTypeNumber.bind(this);

    const numberSort = (a, b, order, sortField) => {
      if ( order === 'desc' ) {
        return b[sortField] - a[sortField];
      } else {
        return a[sortField] - b[sortField];
      }
    }

    const renderTableColumns = () => {
      const TableColumns = [];

      for ( let key in header) {
        TableColumns.push(
          <TableHeaderColumn
            isKey={key === 'Автор'}
            dataField={key}
            key={key}
            dataSort={true}
            sortFunc={(isColumnTypeNumber(header[key]) ? numberSort : null)}
          >
            {key}
          </TableHeaderColumn>
        );
      }

      return TableColumns;
    }

    return (
      <div>

      { 
        ( isFetching ) 

        ?

        <LoadingSpinner />

        :

        <div>

          <div className='report-header'>
            <h1>{formTitle}</h1>

            {
              (formDescription !== undefined && formDescription !== '') ?
              <button type='button' className='btn btn-default btn-xs description-toggle-btn' onClick={toggleDescriptionHandler}>
                <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span>
              </button> :
              null
            }

            {
              (isDescriptionVisible) ?
              <blockquote>{formDescription}</blockquote> :
              null
            }
          </div>

          <BootstrapTable 
            data={answers}
            striped={true}
            hover={true}
            height={(!isGenerationVisible) ? '500' : '300'}
          >
            { renderTableColumns() }
          </BootstrapTable>

          {
            ( isGenerationVisible )
          
            ?

            <ReportGeneration
              header={header}
              hideGenerationHandler={hideGenerationHandler}
            />

            :
            <button type='button' className='btn btn-default' onClick={showGenerationHandler}>Создать отчет</button>
          }

        </div>
      }
      
      </div>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    isDescriptionVisible: state.report.isDescriptionVisible,
    isFetching: state.report.isFetching,
    isGenerationVisible: state.report.isGenerationVisible,
    header: state.report.header,
    answers: state.report.answers,
    formTitle: state.report.boilerplate.name,
    formDescription: state.report.boilerplate.description
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataHandler: (url) => {
      dispatch( fetchData(url) );
    },
    showGenerationHandler: () => {
      dispatch( showReportGeneration() );
    },
    hideGenerationHandler: () => {
      dispatch( hideReportGeneration() );
    },
    toggleDescriptionHandler: () => {
      dispatch( toggleDescription() );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);