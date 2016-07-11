import React from 'react';
import ReactDOM from 'react-dom';
// import d3 from 'd3';

class ColumnChart extends React.Component {
  render() {
    return (
      <div className="vis">

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
      left: 40,
      bottom: 40,
      right: 100,
      top: 75
    };
    const color = d3.scale.ordinal().range(['#2975E9', '#37dad3', '#fd810e', '#ffcf3z']);
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

    //title
    gEnter.append('text').attr('class', 'title').text(this.props.title)
                  .attr('transform', 'translate(0, -25)');

    //group scale
    /* format x values to start with capitals */
    const xGroups = data.map(d => {return d[this.props.xVal]});
    const groupScale = d3.scale.ordinal().rangeRoundBands([0, innerW], 0.2).domain(xGroups);

    //within group scale
    const xValues = this.props.yVal.map(d => {return d});
    const xScale = d3.scale.ordinal().domain(xValues).rangeRoundBands([0, groupScale.rangeBand()]);

    //format data to make groups of bars
    data.forEach(d => {
      d.groupDetails = xValues.map(name => {return {name: name, value: +d[name]}});
    });

    //y scale
    const yScale = d3.scale.linear()
                    .domain([0, d3.max(data, d => {return d3.max(d.groupDetails, d => {return d.value})})])
                    .range([innerH, 0]);

    //set axes
    const xAxis = d3.svg.axis().orient('bottom').scale(groupScale);
    const yAxis = d3.svg.axis().orient('left').scale(yScale).innerTickSize(-innerW);

    //call axes
    svg.select('.x').attr('transform', 'translate(' + 0 + ', ' + innerH + ')')
                    .transition()
                    .duration(1000)
                    .call(xAxis);

    svg.select('.y')
              .transition()
              .duration(1000)
              .call(yAxis);

    gEnter.selectAll('line') .style("stroke-dasharray", ("1, 1"));

    const g = svg.select('.gEnter');

    const groups = g.selectAll('.groups').data(data);

    groups.enter().append('g')
            .attr('class', 'groups')
            .attr('transform', d => {return 'translate(' + groupScale(d[this.props.xVal]) + ', 0)'});

    const bars = groups.selectAll('rect').data(d => {return d.groupDetails});

    bars.enter().append('rect')
        .attr('x', d => {return xScale(d.name)})
        .attr('y', innerH)
        .attr('class', 'bars')
        .attr('width', xScale.rangeBand())
        .attr('height', 0)
        .attr('fill', d => {return color(d.name)});

    bars.exit().remove();

    bars.transition().duration(1000)
        .attr('y', d => {return yScale(d.value)})
        .attr('height', d => {return (innerH - yScale(d.value))});

    bars.on('mouseover', function() {
      bars.attr('opacity', 0.5);
      d3.select(this).attr('opacity', 1.0);
    });

    bars.on('mouseout', function() {
      bars.attr('opacity', 1.0);
    });

    const legend = g.selectAll('.legend').data(xValues);

    legend.enter().append('rect')
          .attr('transform', function(d, i) {return 'translate(0, ' + (i * 25) + ')'})
          .attr('x', innerW + 25)
          .attr('width', 20)
          .attr('height', 20)
          .attr('class', 'legend')
          .attr('fill', d => {return color(d)})
          .attr('opacity', 0);

    legend.transition().duration(1000).attr('opacity', 1);

    const words = g.selectAll('.legend-text').data(xValues);

    words.enter().append('text')
          .attr('transform', function(d, i) {return 'translate(0, ' + (i * 25) + ')'})
          .attr('x', innerW + 50)
          .attr('y', 9)
          .attr('dy', '.35em')
          .style('text-anchor', 'start')
          .text(d => {return d})
          .attr('class', 'legend-text')
          .attr('opacity', 0);

    words.transition().duration(1000).attr('opacity', 1);
  }

  //update
  componentDidUpdate() {
    const data = this.props.data;
    const width = this.props.width;
    const height = this.props.height;
    const margin = {
      left: 40,
      bottom: 40,
      right: 100,
      top: 75
    };
    const color = d3.scale.ordinal().range(['#2975E9', '#37dad3', '#fd810e', '#ffcf3z']);
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    //element in which to put the chart(s)
    const cont = d3.select(ReactDOM.findDOMNode(this));

    //svg to work with
    const svg = cont.selectAll('svg');

    //update scales
    const xGroups = data.map(d => {return d[this.props.xVal]});
    const groupScale = d3.scale.ordinal().rangeRoundBands([0, innerW], 0.2).domain(xGroups);

    const xValues = this.props.yVal.map(d => {return d});
    const xScale = d3.scale.ordinal().domain(xValues).rangeRoundBands([0, groupScale.rangeBand()]);

    data.forEach(d => {
      d.groupDetails = xValues.map(name => {return {name: name, value: +d[name]}});
    });

    const yScale = d3.scale.linear()
                    .domain([0, d3.max(data, d => {return d3.max(d.groupDetails, d => {return d.value})})])
                    .range([innerH, 0]);

    //update axes
    const xAxis = d3.svg.axis().orient('bottom').scale(groupScale);
    const yAxis = d3.svg.axis().orient('left').scale(yScale).innerTickSize(-innerW);

    svg.select('.x').attr('transform', 'translate(' + 0 + ', ' + innerH + ')')
                    .transition().duration(1000)
                    .call(xAxis);

    svg.select('.y')
        .transition().duration(1000)
        .call(yAxis);

    //update bars
    const g = svg.select('.gEnter');

    const groups = g.selectAll('.groups').data(data);

    groups.transition().duration(1000)
            .attr('transform', d => {return 'translate(' + groupScale(d[this.props.xVal]) + ', 0)'});

    const bars = groups.selectAll('rect').data(d => {return d.groupDetails});

    //make bars transition out!!!!!!!!!!!!!!!!
    bars.exit().transition().duration(1000).attr('height', 0).attr('y', innerH).remove();

    bars.enter().append('rect')
        .attr('height', 0)
        .attr('y', innerH);

    bars.attr('fill', d => {return color(d.name)});

    bars.transition().duration(1000)
      .attr('x', d => {return xScale(d.name)})
      .attr('y', d => {return yScale(d.value)})
      .attr('class', 'bars')
      .attr('width', xScale.rangeBand())
      .attr('height', d => {return (innerH - yScale(d.value))})
      .attr('fill', d => {return color(d.name)});

      bars.on('mouseover', function() {
        bars.attr('opacity', 0.5);
        d3.select(this).attr('opacity', 1.0);
      });

      bars.on('mouseout', function() {
        bars.attr('opacity', 1.0);
      });

      const legend = g.selectAll('.legend').data(xValues);

      legend.exit().transition().duration(1000).attr('opacity', 0).remove();

      legend.enter().append('rect')
            .attr('fill', d => {return color(d)})
            .attr('opacity', 0)
            .attr('transform', 'translate(0, 100)');

      legend.transition().duration(1000)
            .attr('transform', function(d, i) {return 'translate(0, ' + (i * 25) + ')'})
            .attr('x', innerW + 25)
            .attr('width', 20)
            .attr('height', 20)
            .attr('class', 'legend')
            .attr('fill', d => {return color(d)})
            .attr('opacity', 1);

      const words = g.selectAll('.legend-text').data(xValues);

      words.exit().transition().duration(1000).attr('opacity', 0).remove();

      words.enter().append('text')
            .text(d => {return d})
            .attr('opacity', 0)
            .attr('transform', 'translate(0, 100)');

      words.transition().duration(1000)
            .attr('transform', function(d, i) {return 'translate(0, ' + (i * 25) + ')'})
            .attr('x', innerW + 50)
            .attr('y', 9)
            .attr('dy', '.35em')
            .style('text-anchor', 'start')
            .text(d => {return d})
            .attr('class', 'legend-text')
            .attr('opacity', 1);
  }

  //exit remove
  componentWillUnmount() {

  }
}

export default ColumnChart;