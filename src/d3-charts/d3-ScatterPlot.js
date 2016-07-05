const create = (elem, props) => {
  const margin = {left: 40, bottom: 40, right: 100, top: 75};
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
  gEnter.append('text').attr('class', 'title').text(props.title).attr('transform', 'translate(0, -40)');

  /*---------------- set scales----------------*/

  const xScale = getXScale(innerW).domain([0, d3.max(props.data, d => {return d[props.xVal]})]);
  const yScale = getYScale(innerH).domain([0, d3.max(props.data, d => {return d[props.yVal]})]);

  /*--------------- set axes ------------------*/
  const xAxis = d3.svg.axis().orient('bottom').scale(xScale).innerTickSize(-innerH);
  const yAxis = d3.svg.axis().orient('left').scale(yScale).innerTickSize(-innerW);

  gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')')
                      .transition().duration(1000).call(xAxis);
  gEnter.select('.y').transition().duration(1000).call(yAxis);
  gEnter.selectAll('line') .style("stroke-dasharray", ("1, 1"));

  /*--------------- data points ------------------*/
  const g = svg.select('.gEnter');

  const circles = g.selectAll('circle').data(props.data);

  circles.enter().append('circle')
          .attr('cx', d => {return xScale(d[props.xVal])})
          .attr('cy', innerH)
          .attr('r', 10)
          .attr('opacity', 0)
          .attr('fill', '#2975E9');

  circles.transition().delay(300).duration(1000)
          .attr('opacity', 1)
          .attr('cy', d => {return yScale(d[props.yVal])});
}

//update
const update = () => {

}

const getXScale = (w) => {
  return d3.scale.linear().range([0, w]);
}

const getYScale = (h) => {
  return d3.scale.linear().range([h, 0]);
}

export { create, update };
