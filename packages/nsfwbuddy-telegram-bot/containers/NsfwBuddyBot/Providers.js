const {
  createSession,
  updateSession,
  destroySession } = require('../../actions/Session');
const { createLink } = require('../../actions/Link');


function getActions(dispatch) {
  return {
    createSession: id => dispatch(createSession(id)),
    updateSession: (id, data) => dispatch(updateSession(id, data)),
    destroySession: id => dispatch(destroySession(id)),
    createLink: (id, payload) => dispatch(createLink(id, payload))
  }
}

function getProps(state) {
  return {
    session: state.reducers.session,
    getUser: id => state.reducers.session.users[id]
  }
}

module.exports = { getActions, getProps };
