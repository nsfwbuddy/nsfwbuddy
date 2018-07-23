// import { myAction } from '../../actions/MyActions';
import { getLink } from '../../actions/Link';
import { getInfo } from '../../actions/Info';
import { toggleProgress } from '../../actions/UI';

export function getActions(dispatch) {
  return {
    getInfo: shortURL => dispatch(getInfo()),
    getLink: shortURL => dispatch(getLink(shortURL)),
    toggleProgress: isActive => dispatch(toggleProgress(isActive))
  }
}

export function getProps(state, ownProps) {
  return {
    link: state.reducers.link,
    info: state.reducers.info
  }
}
