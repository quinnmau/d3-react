import React from 'react';
import ReactDOM from 'react-dom';
import {create} from '../d3-charts/d3-Legend';

class Legend extends React.Component {
  render() {
    return (
      <div className="solo-legend">

      </div>
    )
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    create(el, this.props);
  }
}

export default Legend;
