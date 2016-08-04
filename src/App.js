import React, { Component } from 'react';
import Form from './Form';

const scheme = {
  title: 'My form',
  questions: [
    {
      _type: 'question',
      title: 'first question',
      type: 'integer'
    },
    {
      _type: 'delimeter',
      title: 'here is delimeter'
    },
    {
      _type: 'question',
      title: 'second question',
      type: 'string'
    }
  ]
};

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world.</h1>
        <Form scheme={scheme}/>
      </div>
    );
  }
}
