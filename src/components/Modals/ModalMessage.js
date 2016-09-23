import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import { bindFunctions } from '../../utils';

const defaults = {
	btn: {
		style: 'btn-default',
		text: 'Закрыть'
	}
};

export default class ModalMessage extends Component {
	constructor(props) {
		super(props);

		bindFunctions.call(this, ['renderFooter']);
	}

	renderFooter() {
		const style = this.props.btn.style || defaults.btn.style;
		const text = this.props.btn.text || defaults.btn.text;
		const hideModal = this.props.hideModal;

		return (
			<div>
				<button type="button" className={`btn ${style}`}
					onClick={hideModal}>
					{text}</button>
			</div>
		);
	}

	render() {
		const {
			title, body
		} = this.props;

		return (
			<Modal
				title={title}
				body={body}
				footer={this.renderFooter()}
			/>
		);
	}
}

ModalMessage.propTypes = {
	title: PropTypes.string,
	hideModal: PropTypes.func.isRequired,
	body: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string
	]).isRequired,
	btn: PropTypes.shape({
		text: PropTypes.string,
		style: PropTypes.string
	})
}

ModalMessage.defaultProps = defaults;