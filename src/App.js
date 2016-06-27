import React from 'react';
import ReactDOM from 'react-dom';
import ColumnChart from './ColumnChart';

const data = [
  {
    id: 1,
    name: 'steve',
    freq: 13
  },
  {
    id: 2,
    name: 'earl',
    freq: 5
  },
  {
    id: 3,
    name: 'jimi',
    freq: 22
  }
];

const data2 = [
  {
    id: 1,
    name: 'steve',
    freq: 31
  },
  {
    id: 2,
    name: 'earl',
    freq: 22
  },
  {
    id: 3,
    name: 'jimi',
    freq: 5
  }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {data: data};
  }

  render() {
    setTimeout(() => {
      this.setState({data: data2});
    }, 5000);
    return (
      <div>
        <ColumnChart data={this.state.data}
                     width={500}
                     height={500}
                     xVal={'name'}
                     yVal={'freq'}
        />
        <button onClick={this.update}>click me</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
