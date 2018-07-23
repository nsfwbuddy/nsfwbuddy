import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {LinearBar} from './LinearBar';
import {LinearUndetermined} from './LinearUndetermined';

export class LinearProgress extends Component {
  static propTypes = {
    mode: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    mode: 'determinate',
    style: {}
  }

  componentWillMount () {
    this.ProgressBar = this.props.mode === 'determinate'
      ? LinearBar
      : LinearUndetermined
  }

  render () {
    return(<this.ProgressBar {...this.props} />)
  }
}

export default LinearProgress
