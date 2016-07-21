import React, { Component } from 'react';
import Input from './Input';
import buildModel from './Model';

const initialState = ['123', '456'];
/*
@param:
@scheme
 */
export default class Form extends Component {

	constructor(props) {
		super(props);

		this.state = {
			responses: initialState,
			model: []
		};

		this.state.model = this.buildModel(this.props.scheme);

		this.changeHandler = this.changeHandler.bind(this);
	}

	buildModel(scheme) {
		//copying scheme to solo object
		const model = scheme.questions.map( (item, i) => (Object.assign({}, item)));

		let nextAvailableResponsesKey = 0;
		for (let key in model) {
			let item = model[key];

			if (item._type === 'question') {
				//set pointer to element in responses object, where the value of input field will be stored
				item._responseKey = nextAvailableResponsesKey;
				nextAvailableResponsesKey++;

				//dynamic changing value of field
				// Object.defineProperty(item, "value", { 
				// 	get: () => (this.state.responses[item._responseKey]),
				// 	set: (value) => {
				// 		const newResponsesState = this.state.responses.slice();
				// 		newResponsesState[item._responseKey] = value;
				// 		this.setState({responses: newResponsesState});
				// 	}
				// });
			}
		}

		console.log('Builded model: ');
		console.log(model);
		return model;
	}

	changeHandler(key, value) {
		const newResponsesState = this.state.responses.slice();

		newResponsesState[key] = value;

		this.setState({responses: newResponsesState});
	}

	render() {

		const model = this.state.model;
		const formTitle = this.props.scheme.title;

		return (
			<form action="" method="POST" role="form">
				<legend>{formTitle}</legend>
			
					{
						model.map( (item, i) => {
							const itemType = item._type;

							switch (itemType) {
								case 'question':
									return <Input key={i} model={item} value={this.state.responses[item._responseKey]} onChange={this.changeHandler}/>;

								default:
									return <div key={i}>Delimeter</div>
							}
						})
					}

				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		)
	}
}