import React from 'react';

const FormGroup = props =>
  <div {...props} className={`form-group ${props.className || ''}`} />

export default FormGroup;
