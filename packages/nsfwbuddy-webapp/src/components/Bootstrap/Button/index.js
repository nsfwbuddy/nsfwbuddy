import React from 'react';

const Button = props =>
  <button
    {...props}
    className={
      `btn btn${props.outline === "true" ? "-outline-" : "-" }${props.look || ''} ${props.className || ''}`
    }
  />

export default Button
