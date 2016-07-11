const create = (elem, props) => {
  //variables
  const margin = {left: 40, bottom: 40, right: 40, top: 40};
  const innerW = props.width - margin.left - margin.right;
  const innerH = props.height - margin.top - margin.bottom;
  const color = d3.scale.ordinal().range(['#2975E9', '#37dad3', '#fd810e', '#ffcf3z']);
  const radius = Math.min(innerW, innerH) / 2;
  const arc = d3.svg.arc().innerRadius(radius - 10)
                          .outerRadius(radius - 70);

  const donut = d3.layout.pie().sort(null).value(d => {return d[props.dep]});

  const cont = d3.select(elem);

  const svg = cont.selectAll('svg').data([props.data]);

  //svg for the donut
  const gEnter = svg.enter().append('svg')
                    .attr('width', props.width)
                    .attr('height', props.height)
                    .append('g');

  //positioning
  gEnter.attr('class', 'gEnter')
        .attr('transform', 'translate(' + (props.width / 2) + ', ' + (props.height / 2) + ')')
        .attr('width', innerW)
        .attr('height', innerH);

  /*-----------------------------------------------------*/

  const g = svg.select('.gEnter');

  g.append('text').attr('class', 'h1 hero-heading big-num').attr('text-anchor', 'middle');
  g.append('text').attr('class', 'h3 small-num')
                  .attr('text-anchor', 'middle')
                  .attr('transform', 'translate(0, 30)');

  //format data
  let total = 0;
  props.data.forEach(d => {
    total += d[props.dep];
  });
  props.data.total = total;

  //arc groups
  const arcs = g.selectAll('.arc')
                .data(donut(props.data))
                .enter().append('g')
                  .attr('class', 'arc');

  //actual arcs
  arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => {return color(d.data[props.indy])});

  //Enlarge arc size on mouseover
  arcs.on('mouseover', function(d) {
    const cover = d3.svg.arc().innerRadius(radius)
                              .outerRadius(radius - 80);

    const curr = d3.select(this).select('path')
                    .transition().duration(500)
                    .attr('d', cover);

    let format = d3.format('%');

    g.select('.big-num').text(format(d.data[props.dep] / props.data.total));
    g.select('.small-num').text(d.data[props.indy]);
  });

  //make size normal when mouse leaves arc
  arcs.on('mouseout', function() {
    const cover = d3.svg.arc().innerRadius(radius - 10)
                              .outerRadius(radius - 70);

    const curr = d3.select(this).select('path')
                    .transition().duration(500)
                    .attr('d', cover);
  });

}

export {create};
