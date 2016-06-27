import React from 'react';
import ReactDOM from 'react-dom';
// import d3 from 'd3';

class ColumnChart extends React.Component {
  render() {
    return (
      <div id="vis">

      </div>
    );
  }

  //enter
  componentDidMount() {
    //component globals
    const data = this.props.data;
    const width = this.props.width;
    const height = this.props.height;
    const margin = {
      left: 75,
      bottom: 75,
      right: 100,
      top: 50
    };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    //element in which to put the chart(s)
    const cont = d3.select(ReactDOM.findDOMNode(this));

    //svg to work with
    const svg = cont.selectAll('svg').data([data]);

    //group for data and axes
    const gEnter = svg.enter().append('svg')
                      .attr('width', width)
                      .attr('height', height)
                      .attr('class', 'canvas')
                      .append('g');

    //position group
    gEnter.attr('width', innerW)
          .attr('height', innerH)
          .attr('class', 'gEnter')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    //group for x axis
    gEnter.append('g').attr('class', 'x axis');

    //group for y axis
    gEnter.append('g').attr('class', 'y axis');

    //group for x label
    gEnter.append('text').attr('class', 'x-label')

    //group for y label
    gEnter.append('text').attr('class', 'y-label');

    //Get unique x values and set x Scale
    const xValues = data.map(d => {return d[this.props.xVal]});
    const xScale = d3.scale.ordinal().rangeBands([0, innerW], 0.2).domain(xValues);

    //set y scale
    const yMax = d3.max(data, d => {return d[this.props.yVal]});
    const yScale = d3.scale.linear().domain([0, yMax]).range([innerH, 0]);

    //set axes
    const xAxis = d3.svg.axis().orient('bottom').scale(xScale);
    const yAxis = d3.svg.axis().orient('left').scale(yScale);

    //call axes
    svg.select('.x').attr('transform', 'translate(' + 0 + ', ' + innerH + ')')
                    .transition()
                    .duration(1000)
                    .call(xAxis);

    svg.select('.y')
              .transition()
              .duration(1000)
              .call(yAxis);

    const g = svg.select('.gEnter');

    const bars = g.selectAll('rect').data(data);

    bars.enter().append('rect')
        .attr('x', d => {return xScale(d[this.props.xVal])})
        .attr('y', d => {return yScale(d[this.props.yVal])})
        .attr('class', 'bars')
        .attr('width', xScale.rangeBand())
        .attr('height', d => {return (innerH - yScale(d[this.props.yVal]))})
        .attr('fill', '#2975E9');

    bars.on('mouseover', function() {
      bars.attr('opacity', 0.5);
      d3.select(this).attr('opacity', 1.0);
    });

    bars.on('mouseout', function() {
      bars.attr('opacity', 1.0);
    });
  }

  //update
  componentDidUpdate() {
    const data = this.props.data;
    const width = this.props.width;
    const height = this.props.height;
    const margin = {
      left: 75,
      bottom: 75,
      right: 100,
      top: 50
    };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    //element in which to put the chart(s)
    const cont = d3.select(ReactDOM.findDOMNode(this));

    //svg to work with
    const svg = cont.selectAll('svg');

    //update scales
    const xValues = data.map(d => {return d[this.props.xVal]});
    const xScale = d3.scale.ordinal().rangeBands([0, innerW], 0.2).domain(xValues);

    const yMax = d3.max(data, d => {return d[this.props.yVal]});
    const yScale = d3.scale.linear().domain([0, yMax]).range([innerH, 0]);

    //update axes
    const xAxis = d3.svg.axis().orient('bottom').scale(xScale);
    const yAxis = d3.svg.axis().orient('left').scale(yScale);

    svg.select('.x').attr('transform', 'translate(' + 0 + ', ' + innerH + ')')
                    .transition().duration(1000)
                    .call(xAxis);

    svg.select('.y')
        .transition().duration(1000)
        .call(yAxis);

    //update bars
    const g = svg.select('.gEnter');

    const bars = g.selectAll('rect').data(data);

    bars.exit().remove();

    bars.transition().duration(1000)
        .attr('x', d => {return xScale(d[this.props.xVal])})
        .attr('y', d => {return yScale(d[this.props.yVal])})
        .attr('class', 'bars')
        .attr('width', xScale.rangeBand())
        .attr('height', d => {return (innerH - yScale(d[this.props.yVal]))})
        .attr('fill', '#2975E9');

    // console.log('shoes');
  }

  //exit remove
  componentWillUnmount() {

  }
}

export default ColumnChart;
