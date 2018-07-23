const props = Symbol('props');
const state = Symbol('state');

class Component {
  constructor(props) {
    this.setProps(props);
    this[state] = {};
  }

  get props() {
    return this[props];
  }

  set props(value) {
    if (typeof value !== 'object' && !Array.isArray(value) && value !== null) {
      throw new Error('props must be an object');
    }
    this.setProps(value) ;
  }

  get state() {
    return this[state];
  }

  set state(value) {
    if (typeof value !== 'object' && !Array.isArray(value) && value !== null) {
      throw new Error('state must be an object');
    }
    this.setState(value);
  }

  componentWillReceiveProps(props) {
    /** should be implemented in child class */
  }

  setProps(newProps) {
    this[props] = Object.assign(this.defaultProps || {}, this[props], newProps);
  }

  setState(newState) {
    this[state] = Object.assign({}, this[state], newState);
  }
}

module.exports = Component;
