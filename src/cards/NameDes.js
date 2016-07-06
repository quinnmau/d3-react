import React from 'react';

const NameDes = ({name, des}) =>
  <div className="card-header">
    <h3 className="card-title">{name}</h3>
    <p className="card-caption">{des}</p>
  </div>

export default NameDes;
