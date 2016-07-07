const create = (elem, props) => {
  //variables
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
  gEnter.append('text').attr('class', 'title').attr('transform', 'translate(0, -40)').text(props.title);

  console.log(props.data);

  const xValues = props.data.map(d => {return d[props.xVal]});
  const xScale = d3.scale.ordinal().range([0, innerW]).domain(d3.extent(xValues));


  const yScale = d3.scale.linear().range([innerH, 0]).domain([0, 25]);

  const g = svg.select('.gEnter');

  const groups = g.selectAll('.groups').data(props.data);
  console.log(groups);

  groups.enter().append('g')
        .attr('class', 'groups');
}

export {create};
