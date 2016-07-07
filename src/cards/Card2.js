import React from 'react';
import NameDes from './NameDes';
import BigStat from './BigStat';
import SparkcolumnChart from '../SparkcolumnChart';

const Card2 = (props) =>
  <div className="card micro-card">
    <NameDes name={props.name} des={props.des}/>
    <BigStat number={props.number}/>
    <SparkcolumnChart data={props.data} width={300} height={175} xVal={'name'} yVal={['freq1']}/>
  </div>

export default Card2;
