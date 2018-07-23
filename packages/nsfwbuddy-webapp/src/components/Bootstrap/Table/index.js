import React from 'react'

const Table = props =>
  <div {...props} className={`table ${props.className || ''}`} />

export default Table;
