import React from 'react';

const Container = props =>
  <div
    {...props}
    className={`${props.fluid === 'true' ? 'container-fluid': 'container'} ${props.className || ''}`}
  />

export default Container;
