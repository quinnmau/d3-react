import React from 'react';
import ReactDOM from 'react-dom';
import ColumnChart from './ColumnChart';
import BarChart from './BarChart';
import StackedColumnChart from './StackedColumnChart';
import StackedBarChart from './StackedBarChart';
import LineChart from './LineChart';
import ScatterPlot from './ScatterPlot';

// const data = [
//   {
//     month: 'jan',
//     usa: 2,
//     china: 3,
//     germany: 5
//   },
//   {
//     month: 'feb',
//     usa: 5,
//     china: 1,
//     germany: 6
//   },
//   {
//     month: 'mar',
//     usa: 9,
//     china: 2,
//     germany: 8
//   }
// ];

const data = [
  {
    name: 'usa',
    x: 6,
    y: 9
  },
  {
    name: 'chn',
    x: 15,
    y: 4
  },
  {
    name: 'jpn',
    x: 10,
    y: 12
  }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {data: data};
  }

  render() {
    return (
      <div>

        <ScatterPlot data={this.state.data}
                      width={500}
                      height={500}
                      xVal={'x'}
                      yVal={'y'}
                      title={'This is a title'}
        />


      </div>
    );
  }
}

// <LineChart data={this.state.data}
//             width={500}
//             height={500}
//             yVal={['usa', 'chn', 'ger']}
//             xVal={'month'}
//             title={'This is a title'}
// />

ReactDOM.render(<App />, document.getElementById('app'));
