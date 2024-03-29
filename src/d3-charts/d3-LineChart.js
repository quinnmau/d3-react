//create chart
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
                    // .attr('width', props.width)
                    // .attr('height', props.height)
                    .attr('viewBox', '0 0 ' + props.width + ' ' + props.height)
                    .attr("preserveAspectRatio", "xMinYMin meet")
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

  /*-------------------set scales---------------------------*/
  const xValues = props.data.map(d => {
    return d3.time.format('%Y-%m').parse(d[props.xVal]);
  });
  const xScale = getXScale(innerW - 50).domain(d3.extent(xValues, d => {return d}));

  const yValues = [];
  props.data.forEach(d => {
    for (let i in d) {
      if (props.yVal.indexOf(i) !== -1) {
        yValues.push(d[i]);
      }
    }
  });

  const yScale = getYScale(innerH).domain([0, d3.max(yValues, d => {return d})]);
  /*-------------------set axes---------------------------*/
  const xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(4).tickPadding(10);
  const yAxis = d3.svg.axis().scale(yScale).orient('left').innerTickSize(-innerW).tickPadding(10);

  gEnter.select('.x').attr('transform', 'translate(25, ' + innerH + ')')
                      .transition().duration(1000)
                      .call(xAxis);

  gEnter.select('.y').transition().duration(1000).call(yAxis);
  /*-------------------plot data---------------------------*/
  const line = d3.svg.line()
                  // .interpolate('basis')
                  .x(d => {return xScale(d.x) + 25})
                  .y(d => {return yScale(d.y)});

  const deps = d3.keys(props.data[0]).filter(key => {return key !== props.xVal}).map(name => {
    return {
      name: name,
      values: props.data.map(a => {
        return {x: d3.time.format('%Y-%m').parse(a[props.xVal]), y: +a[name], name: name};
      })
    };
  });

  const g = svg.select('.gEnter');

  const paths = g.selectAll('.a-path').data(deps);

  paths.enter().append('path')
        .attr('class', 'a-path')
        .attr('d', d => {
          let arr = [];
          for (let i = 0; i < d.values.length; i++) {
            let obj = {x: (+d.values[i].x), y: d3.min(yValues)};
            arr.push(obj);
          }
          return line(arr);
        })
        .style('stroke', d => {return color(d.name)});

  paths.transition().duration(1000)
        .attr('d', d => {return line(d.values)});

  const circlesG = g.selectAll('.circle-g').data(deps);

  circlesG.enter().append('g')
          .attr('class', 'circle-g');

  const circles = circlesG.selectAll('circle').data(d => {return d.values});

  circles.enter().append('circle')
          .attr('class', 'connectors')
          .attr('r', 4)
          .attr('cx', d => {return xScale(+d.x) + 25})
          .attr('cy', innerH)
          .attr('fill', 'white')
          .style('stroke', d => {return color(d.name)});

  circles.transition().duration(1000)
            .attr('cy', d => {return yScale(d.y)});

  const legend = g.selectAll('.legend').data(props.yVal);

  legend.enter().append('rect')
        .attr('transform', function(d, i) {return 'translate(0, ' + (i * 25) + ')'})
        .attr('x', innerW + 25)
        .attr('width', 20)
        .attr('height', 20)
        .attr('class', 'legend')
        .attr('fill', d => {return color(d)})
        .attr('opacity', 0);

  legend.transition().duration(1000).attr('opacity', 1);

  const words = g.selectAll('.legend-text').data(props.yVal);

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
