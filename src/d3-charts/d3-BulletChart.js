const create = (elem, props) => {
  //variables
  const margin = {left: 40, bottom: 40, right: 40, top: 75};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['#2975E9', '#37dad3', '#fd810e', '#ffcf3z']);

  //container
  const cont = d3.select(elem);

  //svg
  const svg = cont.selectAll('svg').data([props.data]);

  //area for data points
  const gEnter = svg.enter().append('svg')
                    .attr('width', props.width)
                    .attr('height', props.height)
                    .append('g');

  //position area for data points
  gEnter.attr('class', 'gEnter')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .attr('width', innerW)
        .attr('height', innerH);

  //groups for axes and title
  gEnter.append('g').attr('class', 'x axis');
  gEnter.append('g').attr('class', 'y axis');
  gEnter.append('text').attr('class', 'title').attr('transform', 'translate(0, -40)').text(props.title);

  console.log(props.data);

  const xValues = props.data.map(d => {return d[props.xVal]});
  const xScale = d3.scale.ordinal().rangeRoundBands([0, innerW], 0.2).domain(xValues);


  const yScale = d3.scale.linear().range([innerH, 0]).domain([0, 25]);

  // const xAxis = d3.svg.axis().scale(xScale).orient('bottom');
  // gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')').call(xAxis);

  const yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(2);
  gEnter.select('.y').call(yAxis);

  const g = svg.select('.gEnter');

  // const groups = g.selectAll('.groupss').data(props.data);
  // console.log(groups);
  //
  // groups.enter().append('g')
  //       .attr('class', 'groupss')
  //       .attr('transform', d => {return 'translate(' + xScale(d[props.xVal]) + ', 0)'});

  const secondaryBars = g.selectAll('.second-bar').data(props.data);

  secondaryBars.enter().append('rect')
              .attr('class', 'second-bar')
              .attr('x', d => {return xScale(d[props.xVal])})
              .attr('y', d => {console.log(d); return yScale(d[props.range])})
              .attr('width', xScale.rangeBand())
              .attr('height', d => {return (innerH - yScale(d[props.range]))})
              .attr('fill', '#2975E9')
              .attr('opacity', 0.25);

  const actualBars = g.selectAll('.actual-bar').data(props.data);

  actualBars.enter().append('rect')
              .attr('class', 'actual-bar')
              .attr('x', d => {return xScale(d[props.xVal]) + xScale.rangeBand() * .25})
              .attr('y', d => {return yScale(d[props.actual])})
              .attr('width', xScale.rangeBand() * 0.5)
              .attr('height', d => {return innerH - yScale(d[props.actual])})
              .attr('fill', '#2975E9');

  const targetBar = g.selectAll('.target-bar').data(props.data);

  targetBar.enter().append('rect')
            .attr('class', 'targer-bar')
            .attr('x', d => {return xScale(d[props.xVal]) + xScale.rangeBand() * (1 / 6) * .5})
            .attr('y', d => {return yScale(d[props.target])})
            .attr('width', xScale.rangeBand() * (5 / 6))
            .attr('height', xScale.rangeBand() * (1 / 3) * 0.5)
            .attr('fill', '#2975E9');

}

export {create};
