import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

export default class ErrorModalWindow extends Component {
	constructor(props) {
		super(props);

		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler() {
		document.location.pathname = this.props.redirectUrl;
	}

	render() {
		const {
			errorText,
			redirectUrl
		} = this.props;

		return (
			<Modal show={true} backdrop='static'>
				<Modal.Header>
					<Modal.Title>Произошла ошибка</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='alert alert-danger' role='alert'>
						{errorText}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button type="button" className="btn btn-default" onClick={this.clickHandler}>Выйти</button>
				</Modal.Footer>
			</Modal>
		);
	}
}

ErrorModalWindow.propTypes = {
	
}