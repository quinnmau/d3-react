const create = (el, props) => {
  const container = d3.select(el);
  const svg = container.selectAll('svg').data([props.data]);

  const g = svg.enter().append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('background-color', 'blue')
      .append('rect')
      .attr('width', '80%')
      .attr('height', '80%')
      .attr('transform', 'translate(20, 20)');
}

export {create};
