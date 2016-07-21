import React from 'react';
//import legend Component
//import charts to display

class LowerDash extends React.Component {
  constructor(props) {
    super(props);
    this._checkHandler = this._checkHandler.bind(this);

    //initialize checks as empty, populate after
    this.state = {
      data: props.data,
      checks: [

      ],
      currY: []
    };
    props.yVal.forEach(d => {
      //push an object containing check id and its state (checked vs unchecked)
      this.state.checks.push({name: d, isChecked: true});
      this.state.currY.push(d);
    });
  }

  _checkHandler() {
    console.log(this);
  }

  render() {
    return (
      <div>
        {/* as many charts as client wants displayed*/}
        {/*legend component*/}
      </div>
    )
  }
}

export default LowerDash;
