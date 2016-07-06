import React from 'react';
import ReactDOM from 'react-dom';
import { create, update } from 'd3-SparklineChart';

class SparklineChart extends React.Component {
  render() {
    return (
      <div className="vis">

      </div>
    )
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    create(el, this.props);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }
}

export default SparklineChart;
