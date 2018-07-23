import React, {Component} from 'react';
import PropTypes from 'prop-types';
import utils from './progress-bar-utils';
import './ProgressBar.css';

export class LinearBar extends Component {

  static propTypes = {
    easing: PropTypes.string,
    minimum: PropTypes.number,
    positionUsing: PropTypes.string,
    speed: PropTypes.number,
    start: PropTypes.bool,
    style: PropTypes.object,
    trickle: PropTypes.bool,
    trickleSpeed: PropTypes.number,
    value: PropTypes.number,
  };

  static defaultProps = {
    easing: 'linear',
    minimum: 0.08,
    positionUsing: '',
    speed: 200,
    start: false,
    style: {},
    trickle: true,
    trickleSpeed: 200,
    value: null,
  };

  state = {
    hidden: true,
    stopped: true,
    barStyles: {},
    progressStyles: {opacity: 0},
  }

  _isMounted = false;

  constructor (props) {
    super(props)
    this.id = Math.ceil(Math.random() * 100);

    this.cache = {
      stopped: true,
      value: props.value || null,
    }
  }

  componentWillMount () {
    this._isMounted = true;
    if (this.props.start && this.cache.stopped) {
      this.cache.stopped = false
      setTimeout(this.start.bind(this), 100)
    }

    if (this.cache.value) {
      this.initialize(this.cache.value)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.start && this.cache.stopped) {
      this.cache.stopped = false
      setTimeout(this.start.bind(this), 100)
    }

    if (!newProps.start && !this.cache.stopped) {
      this.cache.stopped = true
      setTimeout(this.done.bind(this), 100)
    }

    if (newProps.value !== this.props.value && newProps.value !== this.cache.value) {
      if (!this.state.progressStyles.opacity) {
        this.initialize(this.props.value)
      }

      this.setValue(newProps.value)
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  start () {
    if (this.state.stopped && this._isMounted) {
      this.setState({stopped: this.cache.stopped, hidden: false})
    }

    this.initialize()
    if (this.props.trickle) {
      this.doWork.call(this)
    }

    return this;
  }

  doWork () {
    if (this.cache.stopped) {
      return
    }

    setTimeout(() => {
      if (this.cache.value === null) {
        return;
      }
      this.trickle()
      this.doWork.call(this)
    }, this.props.trickleSpeed)
  }

  done () {
    if (!this.state.stopped) {
      this.setState({stopped: this.cache.stopped})
    }

    return this.increment(0.3 + 0.5 * Math.random()).setValue(1);
  }

  cleanUp () {
    this.setState({ hidden: true });
  }

  initialize (value) {
    if (!this._isMounted) {
      return;
    }
    this.cache.value = value || 0
    const barPercent = utils.toBarPercent(this.cache.value)
    this.setState({
      progressStyles: {
        opacity: 1,
      },
      barStyles: {
        transform: 'translate3d('+barPercent+'%,0,0)',
        transition: 'none'
      }
    })
  }

  fadeProgressBar (speed) {
    this.setState({progressStyles: { transition: 'all ' + speed + 'ms linear', opacity: 0 }})
  }

  trickle (): ProgressBar {
    return this.increment()
  }

  increment (amount: number): ProgressBar {
    let currentValue = Object.assign({},this.cache).value
    if (currentValue === null) return this.start()
    if (currentValue > 1) return

    if (typeof amount !== 'number') {
      if (currentValue >= 0 && currentValue <= 0.2) { amount = 0.04 }
      else if (currentValue >= 0.2 && currentValue <= 0.5) { amount = 0.04 }
      else if (currentValue >= 0.5 && currentValue <= 0.8) { amount = 0.02 }
      else if (currentValue >= 0.8 && currentValue <= 0.98) { amount = 0.01 }
      else if (currentValue > 0.98 && currentValue <= 0.99 && this.props.trickle ) { amount = -0.001 }
      else { amount = 0 }
    }

    currentValue = utils.clamp(currentValue + amount, 0, 0.994);

    return this.setValue(currentValue)
  }

  setValue (value) {
    value = utils.clamp(value, this.props.minimum, 1)
    this.cache.value = value === 1 ? null : value

    const barStyles = this.getBarStyles(this.cache.value, this.cache.stopped)
    this.setState({barStyles})

    const {speed, easing} = this.props
    utils.queue(next => {
      let positionUsing = this.props.positionUsing
      if (positionUsing === '') positionUsing = utils.getPositioningCSS();

      const barStyles = utils.barPositionCSS(value, speed, easing, positionUsing)
      this.setState({barStyles})

      if (value === 1) {
        setTimeout(() => {
          this.fadeProgressBar(speed)
          setTimeout(() => {
            // hide the progress bar
            this.cleanUp();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    })

    return this
  }

  getBarStyles (value: number, stopped: boolean) {
    const percent = stopped ? '-100' : utils.toBarPercent(value || 0)
    return {
      transition: 'all 0 linear',
      transform: 'translate3d(' + percent + '%,0,0)'
    }
  }

  render (): Component {
    if (this.state.hidden) return <div></div>
    const barStyles =   Object.assign({}, this.state.barStyles)
    const progressStyles = Object.assign({
      color: this.props.style.color
    }, this.state.progressStyles)
    return(
      <div className="progressbar-container" style={this.props.style}>
        <div className="progressbar" style={progressStyles}>
          <div className="bar" style={barStyles}>
            <div className="peg" />
          </div>
        </div>
      </div>
    )
  }
}

export default LinearBar
