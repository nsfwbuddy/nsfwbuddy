import { createLink } from '../../actions/Link';
import { toggleProgress } from '../../actions/UI';

export function getActions(dispatch) {
  return {
    createLink: payload => dispatch(createLink(payload)),
    toggleProgress: isActive => dispatch(toggleProgress(isActive))
  }
}

export function getProps(state, ownProps) {
  return {
    link: state.reducers.link
  }
}
