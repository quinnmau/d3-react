import React from 'react';
import LegendComp from './LegendComp';
//import charts to display

class LowerDash extends React.Component {
  constructor(props) {
    super(props);
    this._checkHandler = this._checkHandler.bind(this);

    //initialize checks as empty, populate after
    this.state = {
      data: props.data,
      checks: {},
      currY: []
    };
    props.yVal.forEach(d => {
      //push an object containing check id and its state (checked vs unchecked)
      this.state.checks[d] = true;
      this.state.currY.push(d);
    });
  }

  _checkHandler(name, val) {
    let currChecks = this.state.checks;
    currChecks[name] = val;
    this.setState({checks: currChecks});
    let filterY = [];
    for (let i in this.state.checks) {
      if (this.state.checks[i] == true) {
        filterY.push(i);
      }
    }
    this.setState({currY: filterY});
  }

  render() {
    console.log(this.state.checks);
    console.log(this.state.currY);
    return (
      <div>
        {/* as many charts as client wants displayed*/}
        <LegendComp yVal={this.props.yVal} checkHandle={this._checkHandler}/>
      </div>
    )
  }
}

export default LowerDash;
