import React from 'react';
import ReactDOM from 'react-dom';

class StackedBarChart extends React.Component {
  render() {
    return (
      <div className="vis">

      </div>
    );
  }

  //create
  componentDidMount() {
    const vars = this.vars();
    const color = d3.scale.ordinal().range(['#2975E9', '#37dad3', '#fd810e', '#ffcf3z']);
    const innerW = vars.width - vars.margin.left - vars.margin.right;
    const innerH = vars.height - vars.margin.top - vars.margin.bottom;

    //container
    const cont = d3.select(ReactDOM.findDOMNode(this));

    //svg to work with
    const svg = cont.selectAll('svg').data([vars.data]);

    //main group to hold actual data points
    const gEnter = svg.enter().append('svg')
                    // .attr('width', vars.width)
                    // .attr('height', vars.height)
                    .attr('viewBox', '0 0 ' + vars.width + ' ' + vars.height)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append('g');

    //positioning and size
    gEnter.attr('width', innerW)
          .attr('height', innerH)
          .attr('class', 'gEnter')
          .attr('transform', 'translate(' + vars.margin.left + ', ' + vars.margin.top + ')');

    //add groups for axes
    gEnter.append('g').attr('class', 'x axis');

    gEnter.append('g').attr('class', 'y axis');

    //add text for title
    gEnter.append('text').attr('class', 'title')
            .text(vars.title)
            .attr('transform', 'translate(0, -25)');

    /*---------------------set scales, format data---------------------------------------*/
    //y scale
    const yValues = vars.data.map(d => {return d[vars.yVal]});
    const yScale = this.getYScale(innerH).domain(yValues);

    //x scale
    const xScale = this.getXScale(innerW);

    //format data
    vars.data.forEach(d => {
      let x0 = 0;
      d.segments = vars.xVal.map(type => {return {name: type, x0: x0, x1: x0 += +d[type]}; });
      d.segments.forEach(d => {d.x0 /= x0; d.x1 /= x0;});
    });

    /*------------------------set axes-------------------------------------*/
    const xAxis = d3.svg.axis()
                    .orient('bottom')
                    .scale(xScale)
                    .tickFormat(d3.format('.0%'))
                    .innerTickSize(-innerH)
                    .outerTickSize(0)
                    .tickPadding(10);

    gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                    .transition()
                    .duration(1000)
                    .call(xAxis);

    const yAxis = d3.svg.axis()
                    .orient('left')
                    .scale(yScale)
                    .outerTickSize(0)
                    .tickPadding(10);
    gEnter.select('.y')
                    .transition()
                    .duration(1000)
                    .call(yAxis);



    /*--------------------------actual data points--------------------------*/
    //reselect gEnter
    const g = svg.select('.gEnter');

    const stacks = g.selectAll('.groups').data(vars.data)
                      .enter().append('g')
                      .attr('class', 'groups')
                      .attr('transform', d => {return 'translate(0, ' + yScale(d[vars.yVal]) + ')'});

    const backSegs = stacks.selectAll('rect').data(d => {return d.segments});

    backSegs.enter().append('rect')
        .attr('y', d => {return yScale(d[vars.yVal])})
        .attr('x', d => {return xScale(d.x0)})
        .attr('width', 0)
        .attr('height', yScale.rangeBand())
        .attr('fill', 'white');

    backSegs.transition().delay(function(d, i) {return i * 330}).duration(330)
            .attr('x', d => {return xScale(d.x0)})
            .attr('width', d => {return xScale(d.x1) - xScale(d.x0)});

    const segs = stacks.selectAll('.rect').data(d => {return d.segments});

    segs.enter().append('rect')
        .attr('class', 'rect')
        .attr('y', d => {return yScale(d[vars.yVal])})
        .attr('x', d => {return xScale(d.x0)})
        .attr('width', 0)
        .attr('height', yScale.rangeBand())
        .attr('fill', d => {return color(d.name)});

    segs.on('mouseover', function() {
      segs.attr('opacity', 0.5);
      d3.select(this).attr('opacity', 1.0);
    });

    segs.on('mouseout', function() {
      segs.attr('opacity', 1.0);
    });

    segs.transition().delay(function(d, i) {return i * 330}).duration(330)
            .attr('x', d => {return xScale(d.x0)})
            .attr('width', d => {return xScale(d.x1) - xScale(d.x0)});

    const legend = g.selectAll('.legend').data(vars.xVal);

    legend.enter().append('rect')
          .attr('transform', function(d, i) {return 'translate(0, ' + (i * 25) + ')'})
          .attr('x', innerW + 25)
          .attr('width', 20)
          .attr('height', 20)
          .attr('class', 'legend')
          .attr('opacity', 0);

    legend.attr('fill', d => {return color(d)});

    legend.transition().delay(function(d, i) {return i * 330}).duration(330).attr('opacity', 1);

    const words = g.selectAll('.legend-text').data(vars.xVal);

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

  //update
  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

/*-------------const and scales functions------------------*/

  //returns all props in obj
  vars() {
    return {
      width: this.props.width,
      height: this.props.height,
      margin: {top: 75, left: 60, bottom: 40, right: 100},
      data: this.props.data,
      title: this.props.title,
      xVal: this.props.yVal,
      yVal: this.props.xVal
    };
  }

  //sets x scale with given width passed in for range.
  getXScale(w) {
    return d3.scale.linear().rangeRound([0, w]);
  }

  //sets y scale w/ given height passed for range. Set domain later
  getYScale(h) {
    return d3.scale.ordinal().rangeRoundBands([h, 0], 0.2);
  }
}

export default StackedBarChart;
