import React from 'react';

const Input = props =>
  <input
    {...props}
    id={props.id || ""}
    className={"form-control" + (props.className ? ' ' + props.className : '')}
  />

export default Input;
