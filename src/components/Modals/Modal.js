import React, { Component, PropTypes } from 'react';
import { Modal as BModal } from 'react-bootstrap';

/**
 * Base modal window component
 */
export default class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const backdrop = this.props.backdrop || 'static';

    return (
      <BModal show={true} backdrop='static'>
        <BModal.Header>
          <BModal.Title>{this.props.title}</BModal.Title>
        </BModal.Header>
        <BModal.Body>
        {
          this.props.body.__html ?
          <div dangerouslySetInnerHTML={this.props.body}></div> :
          this.props.body
        }
        </BModal.Body>
        <BModal.Footer>
          {this.props.footer}
        </BModal.Footer>
      </BModal>
    );
  }
}

Modal.propTypes = {
  backdrop: PropTypes.oneOf(['static', true, false]),
  title: PropTypes.string,
  body: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  footer: PropTypes.element
}