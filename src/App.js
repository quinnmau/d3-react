import React from 'react';
import ReactDOM from 'react-dom';
import ColumnChart from './ColumnChart';
import BarChart from './BarChart';

const data2 = [
  {
    id: 1,
    name: 'steve',
    freq: 24,
    freq2: 15
  },
  {
    id: 2,
    name: 'earl',
    freq: 22,
    freq2: 26
  },
  {
    id: 3,
    name: 'jimi',
    freq: 5,
    freq2: 11
  }
];

const data = [
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
    this.state = {data: data2,
    yVal: ['freq', 'freq2']};
  }

  render() {
    return (
      <div>


        <BarChart data={this.state.data}
                     width={500}
                     height={500}
                     xVal={'name'}
                     yVal={this.state.yVal}
                     title={'Frequency of Students'}
        />

        <button onClick={() => {
          this.setState(
            {data: data2,
             yVal: ['freq', 'freq2']
            }
          );
        }}>click me</button>
        <button onClick={() => {
          this.setState(
            {data: data,
             yVal: ['freq']
            }
          );
        }}>click me</button>
      </div>
    );
  }
}

// <ColumnChart data={this.state.data}
//              width={500}
//              height={500}
//              xVal={'name'}
//              yVal={this.state.yVal}
//              title={'Frequency of Students'}
// />

ReactDOM.render(<App />, document.getElementById('app'));
