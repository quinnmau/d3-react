import React from 'react';
import ReactDOM from 'react-dom';
import ColumnChart from './ColumnChart';
import BarChart from './BarChart';
import StackedColumnChart from './StackedColumnChart';
import StackedBarChart from './StackedBarChart';

const data2 = [
  {
    id: 1,
    name: 'steve',
    freq: 24,
    freq2: 15,
    freq3: 36
  },
  {
    id: 2,
    name: 'earl',
    freq: 22,
    freq2: 26,
    freq3: 27
  },
  {
    id: 3,
    name: 'jimi',
    freq: 5,
    freq2: 11,
    freq3: 21
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
    yVal: ['freq'], stackVal: ['freq', 'freq2', 'freq3']};
  }

  render() {
    return (
      <div>


        <StackedColumnChart data={this.state.data}
                            width={500}
                            height={500}
                            xVal={'name'}
                            yVal={this.state.stackVal}
                            title={'This is a title'}
        />

        <StackedBarChart data={this.state.data}
                            width={500}
                            height={500}
                            xVal={'name'}
                            yVal={this.state.stackVal}
                            title={'This is a title'}
        />


      </div>
    );
  }
}



ReactDOM.render(<App />, document.getElementById('app'));

// <ColumnChart data={this.state.data}
//              width={500}
//              height={500}
//              xVal={'name'}
//              yVal={this.state.yVal}
//              title={'This is a title'}
// />
//
// <button onClick={() => {
//   this.setState(
//     {data: data2,
//      yVal: ['freq']
//     }
//   );
// }}>click me</button>
// <button onClick={() => {
//   this.setState(
//     {data: data2,
//      yVal: ['freq', 'freq2']
//     }
//   );
// }}>click me</button>
// <button onClick={() => {
//   this.setState(
//     {data: data2,
//      yVal: ['freq', 'freq2', 'freq3']
//     }
//   );
// }}>click me</button>
//
// <BarChart data={this.state.data}
//              width={500}
//              height={500}
//              xVal={'name'}
//              yVal={this.state.yVal}
//              title={'This is a title'}
// />
