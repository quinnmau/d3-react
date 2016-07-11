import React from 'react';
import NameDes from './NameDes';
import BigStat from './BigStat';
import SparklineChart from '../chart-components/SparklineChart';

const Card = (props) =>
  <div className="card micro-card">
    <NameDes name={props.name} des={props.des}/>
    <BigStat number={props.number}/>
    <SparklineChart data={props.data} width={300} height={175} xVal={'date'} yVal={['usa']}/>
  </div>

export default Card;
