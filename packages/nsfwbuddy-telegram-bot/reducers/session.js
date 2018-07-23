const deepmerge = require('deepmerge');
const { SessionActionType } = require('../actions/Session');
const { LinkActionType } = require('../actions/Link');

const initialState = {
  users: {}
};

let currentState = Object.assign({}, initialState);

function updateState(newState) {
  currentState = deepmerge(currentState, newState);
  return currentState;
}

function createSession(user) {
  const locale = user.language_code ? user.language_code.substr(0,2) : 'en'
  currentState.users[user.id] = {
    locale: locale,
    data : {
      sourceURL: null,
      shortURL: null,
      options: 0,
      expiration: 2,
    },
    lastActive: new Date()
  }
  return currentState;
}

function cleanSession(timeout) {
  const activeUsers = Object.keys(currentState.users)
    .reduce((users, userId) => {
      const timespan = new Date() - currentState.users[id].lastActive;
      if (timespan < timeout) {
        users[userId] = currentState.users[userId];
      }
      return users;
    }, {});
  currentState.users = activeUsers;
  return currentState;
}

function updateSession(id, data) {
  const currentUser = currentState.users[id];

  currentState.users[id] = deepmerge(currentUser, data);
  currentState.lastActive = new Date();
  return currentState;
}

function destroySession(id) {
  delete currentState.users[id];
  return currentState;
}

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SessionActionType.createSession:
      return createSession(action.user);
    case SessionActionType.updateSession:
      return updateSession(action.userId, action.data);
    case SessionActionType.destroySession:
      return destroySession(action.userId);
    case SessionActionType.cleanSession:
      return cleanSession(action.timeout);
    case LinkActionType.createLinkSuccess:
      return updateSession(action.userId, { data: action.response.data[0] })
    default:
      return state;
  }
};
