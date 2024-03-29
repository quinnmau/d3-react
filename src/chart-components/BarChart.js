import React from 'react';
import ReactDOM from 'react-dom';

class BarChart extends React.Component {
  render() {
    return (
      <div className="vis">

      </div>
    )
  }

  globals() {
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

  //creates chart
  componentDidMount() {
    //global variables
    const globals = this.globals();
    // const color = d3.scale.ordinal().range(['#2975E9', '#37dad3', '#fd810e', '#ffcf3z']);
    const innerW = globals.width - globals.margin.left - globals.margin.right;
    const innerH = globals.height - globals.margin.top - globals.margin.bottom;

    //container
    const cont = d3.select(ReactDOM.findDOMNode(this));

    //svg to work with
    const svg = cont.selectAll('svg').data([globals.data]);

    //main group to hold actual data points
    const gEnter = svg.enter().append('svg')
                    // .attr('width', globals.width)
                    // .attr('height', globals.height)
                    .attr('viewBox', '0 0 ' + globals.width + ' ' + globals.height)
                    .attr("preserveAspectRatio", "xMinYMin meet")
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
    gEnter.append('text').attr('class', 'title').text(globals.title).attr('transform', 'translate(0, -25)');

    /*---------------set scales --------------------*/
    //group scale
    const yGroups = globals.data.map(d => {return d[globals.yVal]});
    const groupScale = this.getGroupScale(innerH).domain(yGroups);

    const color = d3.scale.ordinal().range(['#2975E9', '#F7922E', '#37DAD3', '#43B649']);

    //within group scale
    const yValues = globals.xVal.map(d => {return d});
    const yScale = d3.scale.ordinal().rangeRoundBands([groupScale.rangeBand(), 0])
                                  .domain(yValues);

    globals.data.forEach(function(d) {
      d.groupDetails = yValues.map(function(a) {
        return {name: a, value: d[a]};
      });
    });

    const xScale = this.getXScale(innerW).domain([0, d3.max(globals.data, d => {
      return d3.max(d.groupDetails, d => {
        return d.value;
      });
    })]);


    /*----------set axes --------------*/
    const xAxis = this.getXAxis(xScale).innerTickSize(-innerH).tickPadding(10);
    gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                       .transition()
                       .duration(1000)
                       .call(xAxis);

    const yAxis = this.getYAxis(groupScale).tickPadding(10);
    gEnter.select('.y').transition()
                       .duration(1000)
                       .call(yAxis);

    //reselect gEnter
    const g = svg.select('.gEnter');

    const groups = g.selectAll('.groups').data(globals.data);

    groups.enter().append('g')
          .attr('class', 'groups')
          .attr('transform', d => {return 'translate(0, ' + groupScale(d[globals.yVal]) + ')'});

    // //actual data bars
    const backBars = groups.selectAll('rect').data(d => {return d.groupDetails});

    backBars.enter().append('rect')
        .attr('x', 0)
        .attr('y', d => {return yScale(d.name)})
        .attr('width', 0)
        .attr('height', yScale.rangeBand())
        .attr('fill', 'white');

    backBars.exit().remove();

    backBars.transition().duration(1000)
        .attr('width', d => {return xScale(d.value)});

    const bars = groups.selectAll('.rect').data(d => {return d.groupDetails});

    bars.enter().append('rect')
        .attr('class', 'rect')
        .attr('x', 0)
        .attr('y', d => {return yScale(d.name)})
        .attr('width', 0)
        .attr('height', yScale.rangeBand());


    bars.attr('fill', d => {return color(d.name)});

    bars.on('mouseover', function() {
      bars.attr('opacity', 0.5);
      d3.select(this).attr('opacity', 1.0);
    });

    bars.on('mouseout', function() {
      bars.attr('opacity', 1.0);
    });

    bars.exit().remove();

    bars.transition().duration(1000)
        .attr('width', d => {return xScale(d.value)});

    const legend = g.selectAll('.legend').data(yValues);

    legend.enter().append('rect')
          .attr('transform', function(d, i) {return 'translate(0, ' + (i * 25) + ')'})
          .attr('x', innerW + 25)
          .attr('width', 20)
          .attr('height', 20)
          .attr('class', 'legend')
          .attr('fill', d => {return color(d)})
          .attr('opacity', 0);

    legend.transition().duration(1000).attr('opacity', 1);

    const words = g.selectAll('.legend-text').data(yValues);

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

  //updates chart
  componentDidUpdate() {
    //global variables
    const globals = this.globals();
    const color = d3.scale.ordinal().range(['#2975E9', '#37dad3', '#fd810e', '#ffcf3z']);
    const innerW = globals.width - globals.margin.left - globals.margin.right;
    const innerH = globals.height - globals.margin.top - globals.margin.bottom;

    const cont = d3.select(ReactDOM.findDOMNode(this));
    const svg = cont.selectAll('svg');
    const gEnter = svg.select('.gEnter');

    //update scales
    const yGroups = globals.data.map(d => {return d[globals.yVal]});
    const groupScale = this.getGroupScale(innerH).domain(yGroups);

    const yValues = globals.xVal.map(d => {return d});
    const yScale = d3.scale.ordinal().rangeRoundBands([groupScale.rangeBand(), 0])
                                  .domain(yValues);

    globals.data.forEach(function(d) {
      d.groupDetails = yValues.map(function(a) {
        return {name: a, value: d[a]};
      });
    });

    const xScale = this.getXScale(innerW).domain([0, d3.max(globals.data, d => {
      return d3.max(d.groupDetails, d => {
        return d.value;
      });
    })]);
    //
    //update axes
    const xAxis = this.getXAxis(xScale).innerTickSize(-innerH);
    gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                       .transition()
                       .duration(1000)
                       .call(xAxis);

    const yAxis = this.getYAxis(groupScale);
    gEnter.select('.y').transition()
                       .duration(1000)
                       .call(yAxis);

     //update groups and bars
     const g = svg.select('.gEnter');

     const groups = g.selectAll('.groups').data(globals.data);

     groups.exit().remove();

     groups.transition().duration(1000)
           .attr('transform', d => {return 'translate(0, ' + groupScale(d[globals.yVal]) + ')'});

     //actual data bars
     const bars = groups.selectAll('rect').data(d => {return d.groupDetails});

     bars.exit().transition()
                .duration(1000)
                .attr('width', 0)
                .remove();

     bars.enter().append('rect')
         .attr('width', 0);

     bars.on('mouseover', function() {
       bars.attr('opacity', 0.5);
       d3.select(this).attr('opacity', 1.0);
     });

     bars.on('mouseout', function() {
       bars.attr('opacity', 1.0);
     });

     bars.attr('fill', d => {return color(d.name)});

     bars.transition().duration(1000)
          .attr('width', d => {return xScale(d.value)})
          .attr('x', 0)
          .attr('y', d => {return yScale(d.name)})
          .attr('height', yScale.rangeBand());

     const legend = g.selectAll('.legend').data(yValues);

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

     const words = g.selectAll('.legend-text').data(yValues);

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

  //removes chart
  componentWillUnmount() {

  }

  /*--------------------getter functions----------------*/

  //returns x scale without domain
  getXScale(w) {
    return d3.scale.linear().range([0, w]);
  }

  //returns y scale without domain or range for individual bars
  //within groups
  getYScale() {
    return d3.scale.ordinal();
  }

  //scale for groups without domain
  getGroupScale(h) {
    return d3.scale.ordinal().rangeRoundBands([h, 0], 0.2);
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
