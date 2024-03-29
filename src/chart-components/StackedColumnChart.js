import React from 'react';
import ReactDOM from 'react-dom';

class StackedColumnChart extends React.Component {
  render() {
    return (
      <div className="vis">

      </div>
    )
  }

  //create chart
  componentDidMount() {
    //dimensions of data points area
    const vars = this.globals();
    const innerW = vars.width - vars.margin.left - vars.margin.right;
    const innerH = vars.height - vars.margin.top - vars.margin.bottom;
    const color = d3.scale.ordinal().range(['#2975E9', '#F7922E', '#37DAD3', '#43B649']);

    //container to hold everything
    const cont = d3.select(ReactDOM.findDOMNode(this));

    //svg to work with
    const svg = cont.selectAll('svg').data([vars.data]);

    //group that holds all data points and axes and legend
    const gEnter = svg.enter().append('svg')
                        // .attr('width', vars.width)
                        // .attr('height', vars.height)
                        .attr('viewBox', '0 0 ' + vars.width + ' ' + vars.height)
                        .attr("preserveAspectRatio", "xMinYMin meet")
                        .append('g');

    //position gEnter
    gEnter.attr('class', 'gEnter')
          // .attr('width', innerW)
          // .attr('height', innerH)
          .attr('transform', 'translate(' + vars.margin.left + ', ' + vars.margin.top + ')');

    //group for x axis
    gEnter.append('g').attr('class', 'x axis');

    //group for y axis
    gEnter.append('g').attr('class', 'y axis');

    //text for title
    gEnter.append('text').attr('class', 'title').attr('transform', 'translate(0, -25)').text(vars.title);

    /*---------------set scales and format data---------------------------*/
    //x scale
    const xValues = vars.data.map(d => {return d[vars.xVal]});
    const xScale = this.getXScale(innerW).domain(xValues);
    //format data
    vars.data.forEach(d => {
      let y0 = 0;
      d.segments = vars.yVal.map(type => {return {name: type, y0: y0, y1: y0 += +d[type]};});
      d.segments.forEach(d => {d.y0 /= y0; d.y1 /= y0;});
    });

    //y scale
    const yScale = this.getYScale(innerH);

    /*---------------set axes-----------------------------*/
    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').outerTickSize(0).tickPadding(10);

    gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
            .transition().duration(1000).call(xAxis);

    const yAxis = d3.svg.axis().scale(yScale).orient('left').tickFormat(d3.format('.0%')).innerTickSize(-innerW).outerTickSize(0).tickPadding(10);

    gEnter.select('.y').transition().duration(1000).call(yAxis);
    /*---------------make stacks----------------------------*/
    //reselect data points container, gEnter
    const g = svg.select('.gEnter');

    //'stacks'
    const groups = g.selectAll('.groups').data(vars.data)
                    .enter().append('g')
                    .attr('class', 'groups')
                    .attr('transform', d => {return 'translate(' + xScale(d[vars.xVal]) + ', 0)'});

    const backSegs = groups.selectAll('rect').data(d => {return d.segments});

    backSegs.enter().append('rect')
        .attr('x', d => {return xScale(d[vars.xVal])})
        .attr('y', d => {return yScale(d.y0)})
        .attr('width', xScale.rangeBand())
        .attr('height', 0)
        .attr('fill', 'white');

    backSegs.transition().delay(function(d, i) {return i * 330}).duration(330)
            .attr('y', d => {return yScale(d.y1)})
            .attr('height', d => {return yScale(d.y0) - yScale(d.y1)});

    const segs = groups.selectAll('.rect').data(d => {return d.segments});

    segs.enter().append('rect')
        .attr('class', 'rect')
        .attr('x', d => {return xScale(d[vars.xVal])})
        .attr('y', d => {return yScale(d.y0)})
        .attr('width', xScale.rangeBand())
        .attr('height', 0)
        .attr('fill', d => {return color(d.name)});

    segs.on('mouseover', function() {
      segs.attr('opacity', 0.5);
      d3.select(this).attr('opacity', 1.0);
    });

    segs.on('mouseout', function() {
      segs.attr('opacity', 1.0);
    });

    segs.transition().delay(function(d, i) {return i * 330}).duration(330)
            .attr('y', d => {return yScale(d.y1)})
            .attr('height', d => {return yScale(d.y0) - yScale(d.y1)});

    const legend = g.selectAll('.legend').data(vars.yVal);

    legend.enter().append('rect')
          .attr('transform', function(d, i) {return 'translate(0, ' + (i * 25) + ')'})
          .attr('x', innerW + 25)
          .attr('width', 20)
          .attr('height', 20)
          .attr('class', 'legend')
          .attr('opacity', 0);

    legend.attr('fill', d => {return color(d)});

    legend.transition().delay(function(d, i) {return i * 330}).duration(330).attr('opacity', 1);

    const words = g.selectAll('.legend-text').data(vars.yVal);

    words.enter().append('text')
          .attr('transform', function(d, i) {return 'translate(0, ' + (i * 25) + ')'})
          .attr('x', innerW + 50)
          .attr('y', 9)
          .attr('dy', '.35em')
          .style('text-anchor', 'start')
          .text(d => {return d})
          .attr('class', 'legend-text')
          .attr('opacity', 0);

    words.transition().delay(function(d, i) {return i * 330}).duration(330).duration(1000).attr('opacity', 1);
  }

  //update chart
  componentDidUpdate() {

  }

  //remove chart
  componentWillUnmount() {

  }

  /*--------------scales, axes, props functions--------------*/

  //returns all props in an obj
  globals() {
    return {
      width: this.props.width,
      height: this.props.height,
      margin: {top: 75, left: 60, bottom: 40, right: 100},
      data: this.props.data,
      title: this.props.title,
      yVal: this.props.yVal,
      xVal: this.props.xVal
    };
  }

  //returns x scale without domain-- set that later
  getXScale(w) {
    return d3.scale.ordinal().rangeRoundBands([0, w], 0.2);
  }

  //returns y scale without domain-- set that later
  getYScale(h) {
    return d3.scale.linear().rangeRound([h, 0]);
  }
}

export default StackedColumnChart;
