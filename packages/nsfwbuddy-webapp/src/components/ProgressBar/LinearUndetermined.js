import React, {Component} from 'react'
import PropTypes from 'prop-types';
import './ProgressBar.css'

export class LinearUndetermined extends Component {
  static propTypes = {
    start: PropTypes.bool,
    style: PropTypes.object,
    color: PropTypes.string,
  }

  constructor (props) {
    super(props)
    this.state = {stopped: true}
    this.cache = {stopped: true}
  }

  componentWillMount () {
    if (this.props.start && this.cache.stopped) {
      this.cache.stopped = false
      setTimeout(this.start.bind(this), 100)
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.start && this.cache.stopped) {
      this.cache.stopped = false
      setTimeout(this.start.bind(this), 100)
    }

    if (!newProps.start && !this.cache.stopped) {
      this.cache.stopped = true
      setTimeout(this.done.bind(this), 100)
    }
  }

  start () {
    if (this.state.stopped) this.setState({stopped: this.cache.stopped})
  }

  done () {
    if (!this.state.stopped) this.setState({stopped: this.cache.stopped})
  }

  render() {
    const progressStyles = this.state.stopped ? {display: 'none'}: {}
    const className = this.state.stopped
      ? 'progressbar undetermined-stopped'
      : 'progressbar undetermined'
    return (
      <div className="progressbar-container" style={this.props.style}>
        <div className={className} style={progressStyles}>
          <div className="bar" style={{background: this.props.style.color}}>
            <div className="peg" />
          </div>
        </div>
      </div>
    )
  }
}

export default LinearUndetermined
