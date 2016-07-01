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
  
  /*-------------------set axes---------------------------*/

  /*-------------------plot data---------------------------*/
}


//update chart
const update = (elem) => {
  console.log(elem);
}

//returns an x scale. Set domain later
const getXScale = (width) => {
  return d3.time().scale().range([0, width]);
}

//returns a y scale. set domain later
const getYScale = (height) => {
  return d3.scale.linear().range([height, 0]);
}

export { create, update };
