import React, { Component, PropTypes } from 'react';

export default class PreviewButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isVisible,
      isGVisible,
      isPVisible,
      hidePreview,
      showPreview,
      hideGenerator,
      showBoth
    } = this.props;

    console.log(this.props);

    return (
      <div className={`btn-group`}>
        {
          isGVisible ?
          <button type="button"
            className="btn btn-default form-generator-preview__expand-btn"
            onClick={isGVisible ? isPVisible ? hideGenerator : showBoth : showPreview}>
            <span className={`glyphicon glyphicon-chevron-left`} aria-hidden="true"></span>
          </button> :
          null
        }
        <button type="button" className="btn btn-default">Предпросмотр</button>
        {
          isPVisible ?
          <button type="button"
            className="btn btn-default form-generator-preview__expand-btn"
            onClick={isGVisible ? hidePreview : showBoth}>
            <span className={`glyphicon glyphicon-chevron-right`} aria-hidden="true"></span>
          </button> :
          null
        }
      </div>
    );
  }
}

PreviewButton.propTypes = {
  
}