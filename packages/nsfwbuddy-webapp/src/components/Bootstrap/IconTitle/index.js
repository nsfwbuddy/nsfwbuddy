import React from 'react';
import './IconTitle.css';

const IconTitle = props =>
  <div className={`IconTitle${props.separator ? ' separator' : ''}`}>
    <div className="title-icon">
      {props.icon}
    </div>
    <div className="title-text">
      {props.children}
    </div>
  </div>

export default IconTitle;
