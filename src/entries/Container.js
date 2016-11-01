import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { copy, fetch, send, remove } from '../redux/modules/myFormsList';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.clickHadler = this.clickHadler.bind(this);
  }

  componentWillMount() {
    this.props.fetch();
  }

  clickHadler() {
    this.props.remove("p9qpyRmW", 'Копия 1');
  }

  render() {
    const {
      load,
      fetch
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

export default connect(null, { copy, fetch, remove, send })(Container);