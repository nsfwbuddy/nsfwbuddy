import { getInfo } from '../../actions/Info';
import { toggleProgress } from '../../actions/UI';

export function getActions(dispatch) {
  return {
    getInfo: payload => dispatch(getInfo()),
    toggleProgress: isActive => dispatch(toggleProgress(isActive))
  }
}

export function getProps(state, ownProps) {
  return {
    info: state.reducers.info,
    progressIsActive: state.reducers.ui.progressIsActive,
  }
}
