import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { copy, get, send, remove } from '../redux/modules/myFormsList';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.clickHadler = this.clickHadler.bind(this);
  }

  componentWillMount() {
    this.props.get();
  }

  clickHadler() {
    this.props.copy("4ap6YmN8n", 'Копия 1');
  }

  render() {
    const {
      load,
      get
    } = this.props;

    return (
      <div>
        <button
          type="button"
          className="btn btn-default"
          onClick={this.clickHadler}
        >
          Remove
        </button>
      </div>
    );
  }
}

export default connect(null, { copy, get, remove, send })(Container);