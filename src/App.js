import React from 'react';
import ReactDOM from 'react-dom';
import ColumnChart from './ColumnChart';
import BarChart from './BarChart';
import StackedColumnChart from './StackedColumnChart';
import StackedBarChart from './StackedBarChart';
import LineChart from './LineChart';
import ScatterPlot from './ScatterPlot';
import { scatter, column, line, bullet } from './testData';
import Random from './Random';
import Card from './cards/Card';
import SparklineChart from './SparklineChart';
import Card2 from './cards/Card2';
import BulletChart from './BulletChart';

const scatterData = scatter();
const columnData = column();
const lineData = line();
const bulletData = bullet();

class App extends React.Component {
  constructor() {
    super();
    this.state = {s: scatterData, c: columnData, l: lineData, b: bulletData};
  }

  render() {
    return (
      <div>
        <BulletChart data={this.state.b}
                     width={500}
                     height={200}
                     yVal={'id'}
                     target={'target'}
                     actual={'actual'}
                     range={'range'} />
      </div>
    );
  }
}

// <Card name={'Growth'} des={'value in percent'} number={'19.1%'} data={this.state.l}/>
// <Card2 name={'Distribution'} des={'value in units'} number={'709'} data={this.state.c} />
// <ScatterPlot data={this.state.s} width={500} height={500} xVal={'x'} yVal={'y'} title={'This is a title'} />
// <StackedColumnChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} title={'This is a title'} />
// <ColumnChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={['freq1', 'freq2']} title={'This is a title'} />
// <StackedBarChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} title={'This is a title'} />
// <BarChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={['freq1']} title={'This is a title'} />
// <LineChart data={this.state.l} width={500} height={500} xVal={'date'} yVal={['usa', 'chn', 'ger']} title={'This is a title'} ticks={5}/>

ReactDOM.render(<App />, document.getElementById('app'));
