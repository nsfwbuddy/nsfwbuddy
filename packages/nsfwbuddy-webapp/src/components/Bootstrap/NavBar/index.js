import React from 'react';
import './NavBar.css'

const NavBar = props => {
  let className = 'navbar';
  if (props.expand === 'true') {
    className += ' navbar-expand ';
  }

  className += props.theme === 'dark'
      ? 'navbar-dark bg-dark'
      : 'navbar-light bg-light';

  if (props.className) className += ' ' + props.className;

  return(
    <div {...props} className={className} />
  )
}

export default NavBar;
