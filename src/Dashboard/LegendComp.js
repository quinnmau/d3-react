import React from 'react';

const LegendComp = (props) =>
  <div>
    {props.yVal.map((item) {
      return <LegendItem value={props.value} />
    })}
  </div>

export default LegendComp;
