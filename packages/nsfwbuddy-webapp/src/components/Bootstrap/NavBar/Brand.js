import React from 'react';

const Brand = props =>
  <a {...props}
    className={"navbar-brand mr-md-02 " + (props.className || '')}>
    {props.children}
  </a>

export default Brand;
