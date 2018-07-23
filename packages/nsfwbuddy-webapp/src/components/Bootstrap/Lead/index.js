import React from 'react';
import './Lead.css';

export default props =>
  <div {...props}
    className={`lead${props.className ? ' ' + props.className : ''}`} />
