import React, { Component, PropTypes } from 'react';

export default class FatalError extends Component {
  constructor(props) {
    super(props);
  }

  redirectToHome() {
    const uri = '/';
    document.location.pathname = uri;
  }

  redirectToLastPage() {
    window.history.back();
  }

  render() {
    const {
      error
    } = this.props;

    return (
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h3 className="panel-title">Произошла ошибка</h3>
        </div>
        <div className="panel-body">
          <p>В ходе работы данной страницы возникла следующая ошибка:</p>
          <div className="alert alert-danger" role="alert">
            <strong>{`${error.name}: `}</strong>
            {error.message}
          </div>
          <div>
            <button
              className="btn btn-default"
              onClick={this.redirectToLastPage}
              style={{marginRight: '5px'}}>
              Назад
            </button>

            <button className="btn btn-default" onClick={this.redirectToHome}>
              На главную
            </button>
          </div>
        </div>
      </div>
    );
  }
}

FatalError.propTypes = {
  error: PropTypes.object
}