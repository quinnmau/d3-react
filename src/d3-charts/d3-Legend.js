const create = (el, props) => {
  const margin = {left: 10, bottom: 20, right: 30, top: 20};
  const color = d3.scale.ordinal().range(['#2975E9', '#37dad3', '#fd810e', '#ffcf3z']);
  const cont = d3.select(el);
  const svg = cont.selectAll('svg').data([props.data]);

  const gEnter = svg.enter().append('svg')
                    .attr('viewBox', '0 0 ' + props.width + ' ' + props.height)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .append('g')
                    .attr('class', 'gEnter');

  gEnter.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .attr('width', (props.width - margin.left - margin.right))
        .attr('height', (props.height - margin.top - margin.bottom));

  const g = svg.select('.gEnter');

  const rects = g.selectAll('rect').data(props.data);

  rects.enter().append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => {return i * 20})
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', d => {return color(d[props.dep])});

  const text = g.selectAll('text').data(props.data);

  text.enter().append('text')
      .attr('x', 23)
      .attr('y', (d, i) => {return i * 20 + 7})
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text(d => {return d[props.dep]});
}

export {create};
