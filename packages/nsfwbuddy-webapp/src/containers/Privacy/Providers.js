import { toggleProgress } from '../../actions/UI';

export function getActions(dispatch) {
  return {
    toggleProgress: isActive => dispatch(toggleProgress(isActive))
  }
}

export function getProps(state, ownProps) {
  return {
    info: state.reducers.info
  }
}
