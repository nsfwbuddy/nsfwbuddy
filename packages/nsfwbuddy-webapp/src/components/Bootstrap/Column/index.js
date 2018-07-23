import React from 'react';

const Column = props =>
  <div {...props} className={`col-${props.size || 'md'}`} />

export default Column;
