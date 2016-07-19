import React from 'react';
import ReactDOM from 'react-dom';
import CheckBox from './CheckBox';

const CheckText = (props) =>
  <div>
    <CheckBox value={props.value}/>
    <span>{props.value}</span>
  </div>

export default CheckText;
