import React from 'react';
import ReactDOM from 'react-dom';

const color = d3.scale.ordinal().range(['#2975E9', '#37dad3', '#fd810e', '#ffcf3z']);

class LegComp extends React.Component {
  render() {
    return (
      <div className="shared-legend">
        {this.props.yVal.map((item) => {
          console.log(item);
          return <div className="legend-item"><input type="checkbox" value={item} className="checkbox" style={{backgroundColor: color(item)}} /> <span className="check-label">{item}</span></div>
        })}
      </div>
    )
  }
}

export default LegComp;
