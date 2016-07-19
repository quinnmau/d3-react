import React from 'react';
import ReactDOM from 'react-dom';
import CheckText from './CheckText';

class LegComp extends React.Component {
  //set state of data. Initially all checkboxes are checked data is unfilitered
  constructor() {
    super();
    this.state = {data: this.props.data};
  }

  render() {
    return (
      <div className="shared-legend">
        {this.props.yVal.map((item) => {
          return <CheckText value={item} />
        })}
      </div>
    )
  }
}

export default LegComp;
