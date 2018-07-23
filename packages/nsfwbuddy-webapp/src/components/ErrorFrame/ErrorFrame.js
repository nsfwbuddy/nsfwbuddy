import React from 'react';
import Container from '../Bootstrap/Container';
import './ErrorFrame.css';

const ErrorFrame = props =>
  <Container>
    <div className="ErrorFrame">
      <div className="ErrorFrame-Title">
        {props.title}
      </div>
      <p>{props.message}</p>
    </div>
  </Container>

export default ErrorFrame;
