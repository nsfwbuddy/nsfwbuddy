const languages = {};

function addMessages(locale, messages) {
  languages[locale] = messages;
}

function formatMessage(locale = 'en', msg) {
  if (!languages[locale]) return msg.defaultMessage || msg.id;
  return languages[locale][msg.id] || msg.defaultMessage || msg.id;
}

module.exports = {
  formatMessage,
  addMessages
}
