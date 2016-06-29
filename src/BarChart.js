import React from 'react';
import ReactDOM from 'react-dom';

class BarChart extends React.Component {
  render() {
    return (
      <div class="vis">

      </div>
    )
  }

  globals() {
    return {
      width: this.props.width,
      height: this.props.height,
      margin: {top: 75, left: 40, bottom: 40, right: 100},
      data: this.props.data,
      title: this.props.title,
      xVal: this.props.xVal,
      yVal: this.props.yVal
    };
  }

  //creates chart
  componentDidMount() {
    //global variables
    const globals = this.globals();
    const color = d3.scale.ordinal().range(['#25b4ff', '#37dad3', '#fd810e', '#ffcf3z']);
    const innerW = globals.width - globals.margin.left - globals.margin.right;
    const innerH = globals.height - globals.margin.top - globals.margin.bottom;

    //container
    const cont = d3.select(ReactDOM.findDOMNode(this));

    //svg to work with
    const svg = cont.selectAll('svg').data([globals.data]);

    //main group to hold actual data points
    const gEnter = svg.enter().append('svg')
                    .attr('width', globals.width)
                    .attr('height', globals.height)
                    .append('g');

    //positioning and size
    gEnter.attr('width', innerW)
          .attr('height', innerH)
          .attr('class', 'gEnter')
          .attr('transform', 'translate(' + globals.margin.left + ', ' + globals.margin.top + ')');

    //add groups for axes
    gEnter.append('g').attr('class', 'x axis');

    gEnter.append('g').attr('class', 'y axis');

    //add text for title
    gEnter.append('text').attr('class', 'title');

    /*---------------set scales --------------------*/
    console.log(globals.data);

    const xScale = this.getXScale(innerW).domain([0, d3.max(globals.data, d => {return d[globals.xVal]})]);

    const yValues = globals.data.map(d => {return d[globals.yVal]});
    const yScale = this.getYScale(innerH).domain(yValues);

    /*----------set axes --------------*/
    const xAxis = this.getXAxis(xScale);

    const yAxis = this.getYAxis(yScale);
  }

  //updates chart
  componentDidUpdate() {
    //global variables
    const globals = this.globals();
    const color = d3.scale.ordinal().range(['#25b4ff', '#37dad3', '#fd810e', '#ffcf3z']);
    const innerW = globals.width - globals.margin.left - globals.margin.right;
    const innerH = globals.height - globals.margin.top - globals.margin.bottom;
  }

  //removes chart
  componentWillUnmount() {

  }

  /*--------------------getter functions----------------*/

  //returns x scale without domain
  getXScale(w) {
    return d3.scale.linear().range([0, w]);
  }

  //returns y scale without domain
  getYScale(h) {
    return d3.scale.ordinal().range([h, 0]);
  }

  //MAKE SURE TO MAKE MORE SPECIFIC CLASSES FOR STYLING ONLY BAR CHART AXES
  getXAxis(x) {
    return d3.svg.axis().scale(x).orient('bottom');
  }

  getYAxis(y) {
    return d3.svg.axis().scale(y).orient('left');
  }
}

export default BarChart;
