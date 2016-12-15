import React, { Component, PropTypes } from 'react';
import Status from './Status';

export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      fetchResponses,
      fetchXLSX,
      updated,
      updating
    } = this.props;

    return (
      <div className='row' style={{marginBottom: '8px', marginTop: '10px'}}>
        <div className='col-xs-1'>
            <button
              type="button"
              className="btn btn-default"
              onClick={fetchXLSX}
            >
              Выгрузить в XLSX
            </button>
        </div>

        <div className='col-xs-4 col-xs-offset-7' style={{textAlign: 'right'}}>
          <Status
            updating={updating}
            updated={updated}
          />

          <button
            type="button"
            className="btn btn-primary"
            onClick={fetchResponses}
          >
              Обновить
            </button>
        </div>

      </div>
    );
  }
}

ControlPanel.propTypes = {
  fetchResponses: PropTypes.func.isRequired,
  fetchResponses: PropTypes.func.isRequired,
  updated: PropTypes.string
}