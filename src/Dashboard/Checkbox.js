import React from 'react';

class CheckBox extends React.Component {
  constructor() {
    super();
    this.clickHandle = this.clickHandle.bind(this);
    this.state = {isChecked: true}
  }

  //handles change to checkbox
  clickHandle() {
    this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    return (
      <input type="checkbox" value={this.props.value} onChange={this.clickHandle} checked={this.state.isChecked} />
    )
  }
}

export default CheckBox;
