import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import { bindFunctions } from '../../utils';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import Moment from 'moment';
Moment.locale('ru');
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);

const dateFormat = 'DD.MM.YYYY';
const timeFormat = 'HH:mm';

export default class ModalSend extends Component {
	constructor(props) {
		super(props);

		this.state = {
			values: {
				allowrefill: false,
				allowexpire: false,
				expires: undefined
			},
			error: undefined
		}

		bindFunctions.call(this, ['renderBody', 'renderFooter', 'renderDatepicker',
			'changeHandler', 'dateChangeHandler', 'sendHandler']);
	}

	dateChangeHandler(date) {
		//incorrect date
		if (date === null)
			return;
		//value as ISO 8601 string
		const value = Moment(date).format();

		const oldState = this.state.values;
		const newState = Object.assign({}, oldState, { expires: value });
		this.setState({
			values: newState,
			error: undefined
		});
	}

	renderDatepicker(value) {
		const error = this.state.error;
		const vClass = error ? 'has-error' : null;

		return (
			<div className={`form-group ${vClass}`}>
				<DateTimePicker
					format={this.displayFormat}
					onChange={this.dateChangeHandler}
					value={ value ? Moment(value).clone().toDate() : null }
				/>
				{
					error ?
					<div className='help-block'>{error}</div> :
					null
				}
			</div>
		);
	}

	changeHandler(e, field) {
		const value = e.target.checked;

		const oldState = this.state.values;
		let newState = {};
		if (field === 'allowexpire' && value === false ) {
			this.setState({
				error: undefined,
				values: Object.assign({}, oldState, {
					allowexpire: false,
					expires: undefined
				})
			});
			return;
		} else {
			this.setState({
				values: Object.assign({}, oldState, {
					[field]: value
				})
			});
			return;
		}
	}

	renderBody() {
		const allowrefill = this.state.values.allowrefill;
		const allowexpire = this.state.values.allowexpire;
		const expires = this.state.values.expires;

		return (
			<div>
				<blockquote style={{fontSize: '14px'}}>
					<p>Для того, чтобы начать сбор ответов по данной форме,
					необходимо получить уникальную ссылку на страницу заполнения формы, нажав на сответствующую кнопку.</p>
					<p>После этого вы можете свободно распростонять полученную ссылку между респондентами, 
					а также получите доступ к странице просмотра полученных ответов.</p>
					<p>Ссылка на форму, также будет отображаться в разделе "Ход мониторинга".</p>
				</blockquote>
				<div className='form-group'>
					<label>
						<input type='checkbox' checked={allowrefill} onChange={(e) => this.changeHandler(e, 'allowrefill')}/>
						Разрешить повторное заполнение формы?
					</label>
				</div>
				<div className='form-group'>
					<label>
						<input type='checkbox' checked={allowexpire} onChange={(e) => this.changeHandler(e, 'allowexpire')}/>
						Ограничить срок приема ответов?
					</label>
				</div>
				{
					allowexpire ?
					this.renderDatepicker(expires) :
					null
				}
			</div>
		);
	}

	sendHandler() {
		const {
			allowexpire,
			expires
		} = this.state.values;

		if (allowexpire === true && expires === undefined) {
			const error = 'Не указана дата окончания приема ответов';
			const oldState = this.state;
			this.setState(Object.assign({}, oldState, {error: error}));
			return;
		}

		this.props.sendHandler(this.state.values);
	}

	renderFooter() {
		const sendHandler = this.props.sendHandler;
		const abortHandler = this.props.hideModal;

		return (
			<div>
				<button type="button" className={`btn btn-primary`}
					onClick={this.sendHandler}>
					Получить ссылку</button>
				<button type="button" className={`btn btn-default`}
					onClick={abortHandler}>
					Отмена</button>
			</div>
		);
	}

	render() {
		return (
			<Modal
				title={'Начать распространение'}
				body={this.renderBody()}
				footer={this.renderFooter()}
			/>
		);
	}
}

ModalSend.propTypes = {
	sendHandler: PropTypes.func.isRequired,
	hideModal: PropTypes.func.isRequired
}

