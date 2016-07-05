//create chart
const create = (elem, props) => {
  //variables
  const margin = {left: 40, bottom: 40, right: 100, top: 75};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;

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
  gEnter.append('text').attr('class', 'title');

  /*-------------------set scales---------------------------*/
  const xValues = props.data.map(d => {
    return d3.time.format('%Y-%m-%d').parse(d[props.xVal]);
  });
  const xScale = getXScale(innerW).domain(d3.extent(xValues, d => {return d}));

  const yValues = props.data.map(d => {return d[props.yVal]});
  const yScale = getYScale(innerH).domain(d3.extent(yValues, d => {return d}));
  /*-------------------set axes---------------------------*/
  const xAxis = d3.svg.axis().scale(xScale).orient('bottom');
  const yAxis = d3.svg.axis().scale(yScale).orient('left').innerTickSize(-innerW);

  gEnter.select('.x').attr('transform', 'translate(0, ' + innerH + ')').call(xAxis);
  gEnter.select('.y').call(yAxis);
  /*-------------------plot data---------------------------*/
  const line = d3.svg.line()
                  // .interpolate('basis')
                  .x(d => {return xScale(d.x)})
                  .y(d => {return yScale(d.y)});

  const deps = d3.keys(props.data[0]).filter(key => {return key !== props.xVal}).map(name => {
    return {
      name: name,
      values: props.data.map(a => {
        return {x: d3.time.format('%Y-%m-%d').parse(a[props.xVal]), y: +a[name]};
      })
    };
  });

  const g = svg.select('.gEnter');

  const paths = g.selectAll('.a-path').data(deps);

  paths.enter().append('path')
        .attr('class', 'a-path')
        .attr('d', d => {return line(d.values)});

  const circlesG = g.selectAll('.circle-g').data(deps);

  circlesG.enter().append('g')
          .attr('class', 'circle-g');

  const circles = circlesG.selectAll('circle').data(d => {return d.values});

  circles.enter().append('circle')
          .attr('r', 4)
          .attr('cx', d => {return xScale(d.x)})
          .attr('cy', d => {return yScale(d.y)});


}


//update chart
const update = (elem) => {
  console.log(elem);
}

//returns an x scale. Set domain later
const getXScale = (width) => {
  return d3.time.scale().range([0, width]);
}

//returns a y scale. set domain later
const getYScale = (height) => {
  return d3.scale.linear().range([height, 0]);
}

export { create, update };
