import React, { Component } from 'react';

export default class Input extends Component {

	constructor(props) {
		super(props);

		this.changeHandler = this.changeHandler.bind(this);
	}

	changeHandler(e) {
		//this.props.model.value = e.target.value;
		
		const updateModel = this.props.onChange;
		const key = this.props.model._responseKey;
		updateModel(key, e.target.value);
	}

	render() {
		const {
			model,
			value
		} =  this.props;

		//console.log(model.value);

		return (
			<div className="form-group">
				<label>{model.title}</label>
				<input type="text" className="form-control" value={value} onChange={this.changeHandler}/>
			</div>
		);
	}
}