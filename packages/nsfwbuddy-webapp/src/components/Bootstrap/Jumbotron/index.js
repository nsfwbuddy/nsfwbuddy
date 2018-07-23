import React from 'react'

const Jumbotron = props =>
  <div {...props} className={
    `jumbotron ${props.fluid === 'true' ? 'jumbotron-fluid' : ''} ${props.className || ''}`
  } />

export default Jumbotron;
