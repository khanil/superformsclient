import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {load, get} from './main';

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.clickHadler = this.clickHadler.bind(this);
  }

  clickHadler() {
    this.props.load();
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
          Click
        </button>
      </div>
    );
  }
}

export default connect(null, { load, get })(Container);