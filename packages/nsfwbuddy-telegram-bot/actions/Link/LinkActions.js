const { LinkActionType } = require('./LinkActionType');

function createLinkAction(id, payload) {
  return({
    API_CALL: {
      types: [
        LinkActionType.createLinkRequest,
        LinkActionType.createLinkSuccess,
        LinkActionType.createLinkFailure,
      ],
      method: 'post',
      endpoint: 'links',
      payload
    },
    userId: id,
  })
}

const createLink = (id, payload) => createLinkAction(id, payload);


module.exports = {
  createLink
}
