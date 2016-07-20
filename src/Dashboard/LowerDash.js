import React from 'react';
//import legend Component

class LowerDash extends React.Component {
  constructor(props) {
    super(props);

    //initialize checks as empty, populate after
    this.state = {
      data: props.data,
      currentData: props.data,
      checks: [

      ]
    };
    props.yVal.forEach(d => {
      //push an object containing check id and its state (checked vs unchecked)
      this.state.checks.push({name: d, isChecked: true});
    });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        {/*legend component*/}
      </div>
    )
  }
}

export default LowerDash;
