import React from 'react';

const Filter = ({ filterList }) => (
  <div>
    filter shown with: <input onChange={filterList}/>
  </div>
);

export default Filter;