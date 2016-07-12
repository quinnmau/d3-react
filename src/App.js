import React from 'react';
import ReactDOM from 'react-dom';
import ColumnChart from './chart-components/ColumnChart';
import BarChart from './chart-components/BarChart';
import StackedColumnChart from './chart-components/StackedColumnChart';
import StackedBarChart from './chart-components/StackedBarChart';
import LineChart from './chart-components/LineChart';
import ScatterPlot from './chart-components/ScatterPlot';
import { scatter, column, line, bullet, nut } from './testData';
import Random from './chart-components/Random';
import Card from './cards/Card';
import SparklineChart from './chart-components/SparklineChart';
import Card2 from './cards/Card2';
import BulletChart from './chart-components/BulletChart';
import DonutChart from './chart-components/DonutChart';
import SideBar from './ui-components/SideBar';
import Header from './ui-components/Header';

const scatterData = scatter();
const columnData = column();
const lineData = line();
const bulletData = bullet();
const nutData = nut();

class App extends React.Component {
  constructor() {
    super();
    this.state = {s: scatterData, c: columnData, l: lineData, b: bulletData, n: nutData};
  }

  render() {
    return (
      <div>
        <SideBar />
        <Header />
      </div>
    );
  }
}

// <DonutChart data={this.state.n} indy={'name'} dep={'population'} width={500} height={500} title={'Sales'}/>
// <Card name={'Growth'} des={'value in percent'} number={'19.1%'} data={this.state.l}/>
// <Card2 name={'Distribution'} des={'value in units'} number={'709'} data={this.state.c} />
// <ScatterPlot data={this.state.s} width={500} height={500} xVal={'x'} yVal={'y'} title={'This is a title'} />
// <StackedColumnChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} title={'This is a title'} />
// <ColumnChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={['freq1', 'freq2']} title={'This is a title'} />
// <StackedBarChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={['freq1', 'freq2', 'freq3']} title={'This is a title'} />
// <BarChart data={this.state.c} width={500} height={500} xVal={'name'} yVal={['freq1']} title={'This is a title'} />
// <LineChart data={this.state.l} width={500} height={500} xVal={'date'} yVal={['usa', 'chn', 'ger']} title={'This is a title'} ticks={5}/>
// <BulletChart data={this.state.b} width={500} height={200} yVal={'id'} target={'target'} actual={'actual'} range={'range'} />

ReactDOM.render(<App />, document.getElementById('app'));
