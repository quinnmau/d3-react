import React from 'react';
import ReactDOM from 'react-dom';
import {create} from './d3-test';

class TestComp extends React.Component {
  render() {
    return (
      <div className="container">

      </div>
    )
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    create(el, this.props);
  }
}

export default TestComp;
