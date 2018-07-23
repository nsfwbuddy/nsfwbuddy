import React from 'react';
import './ActionButtons.css';

const ActionButtons = props =>
  <div {...props}
    className={
      `ActionButtons${props.className ? ' ' + props.className : ''}`
    } />

export default ActionButtons;