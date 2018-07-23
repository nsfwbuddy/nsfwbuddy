const { cleanSession } = require('../../actions/Session');

function getActions(dispatch) {
  return {
    cleanSession: () => dispatch(cleanSession())
  }
}

function getProps(state) {
  return {
    session: state.reducers.session
  }
}

module.exports = { getActions, getProps };
