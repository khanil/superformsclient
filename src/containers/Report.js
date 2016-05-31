import React, {Component} from 'react';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import getDataFromNode from './../utils/getDataFromNode';
import { fetchData, showReportGeneration, hideReportGeneration, toggleDescription} from './../actions/actionsReport';
import ReportGeneration from './ReportGeneration';
import LoadingSpinner from './../components/widgets/LoadingSpinner';
import { isNumeric } from './../utils/questionTypes';

class Report extends Component {

  responsePreviewUrl;

  componentWillMount() {

    let data = getDataFromNode('info', ['getUrl', 'responsePreviewUrl']);

    if ( data.fatalError ) {
      alert('Произошла ошибка при загрузке анкеты. Пожалуйста свяжитесь с техподдержкой.')
    } else {
      //Запрос шаблона формы с сервера
      this.props.fetchDataHandler(data.getUrl);
      this.responsePreviewUrl = data.responsePreviewUrl;
      this.buildCSVUrl = data.buildCSVUrl;
    }

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

    const responsePreviewUrl = this.responsePreviewUrl;
    // const buildReportUrl = this.buildReportUrl;

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
            width='300'
            dataSort={isNumeric(header[key]) ? true : false}
            sortFunc={isNumeric(header[key]) ? numberSort : null}
          >
            {key}
          </TableHeaderColumn>
        );
      }

      return TableColumns;
    }

    const onRowClickHandler = (row) => {
      var adds = responsePreviewUrl.replace('response_id', row.id);

      console.log(adds);
      window.open(window.location.origin + adds, '_blank');
    }

    const optionsProp = {
      onRowClick: onRowClickHandler,
      noDataText: 'Ответов еще нет'
    }

    if (isGenerationVisible) {
      window.onbeforeunload = function() {
        return 'Вы находитесь на стадии формирования отчета.';
      };
    } else {
      window.onbeforeunload = null;
    }

    const getTableHeight = () => (
      window.screen.height - 350 + ''
    );

    return (
      <div>

      { 
        ( isFetching ) 

        ?

        <LoadingSpinner />

        :

        <div>
          <div className='report-header'>
            <h1>

            {formTitle}

            {
              (formDescription !== undefined && formDescription !== '')
              ? <OverlayTrigger
                  placement='top'
                  overlay={<Tooltip>{isDescriptionVisible ? 'Скрыть описание' : 'Показать описание'}</Tooltip>}
                >
                  <button
                    type='button'
                    className='btn btn-info btn-xs btn-tip'
                    onClick={toggleDescriptionHandler}>
                    <i className='fa fa-info' aria-hidden='true'></i>
                  </button>
                </OverlayTrigger>
              : null
            }

            </h1>

            {
              (isDescriptionVisible) ?
              <blockquote>{formDescription}</blockquote> :
              null
            }
          </div>

          <div className='all-answers-table-container'>
            <BootstrapTable 
              data={answers}
              striped={true}
              hover={true}
              height={(!isGenerationVisible) ? getTableHeight() : getTableHeight() - 165 + ''}
              options={optionsProp}>
              { renderTableColumns() }
            </BootstrapTable>
          </div>

          {
            ( isGenerationVisible )
          
            ?

            <ReportGeneration
              header={header}
              hideGenerationHandler={hideGenerationHandler}
            />

            :
            <button
              type='button'
              className='btn btn-default'
              onClick={showGenerationHandler}
              disabled={(answers.length > 0) ? null : 'disabled'}>
              Создать отчет
            </button>
          }

        </div>
      }
      
      </div>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    isDescriptionVisible: state.page.isDescriptionVisible,
    isFetching: state.table.isFetching,
    isGenerationVisible: state.report.isVisible,
    header: state.table.header,
    answers: state.table.answers,
    formTitle: state.table.boilerplate.name,
    formDescription: state.table.boilerplate.description
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