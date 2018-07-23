const env = require('./config/env');
const createStore = require('./core/create-store');
const { setStore } = require('./core/store');
const intl = require('./core/intl');
const { it, en } = require('./l10n');
const createNsfwBuddyBot = require('./containers/NsfwBuddyBot');
const createSessionCleaner = require('./containers/SessionCleaner');
const config = require('./config');
const logger = require('rear-logger')('nsfwbuddy:bot', {
  showTimeLabel: true,
  levels: {
    plugin: 'cyan'
  }
});

function start() {
  ovverideConsole();
  setStore(createStore());
  intl.addMessages('it', it);
  intl.addMessages('en', en);

  const bot = createNsfwBuddyBot({config});

  bot.configureBot();
  bot.start();

  handleSessionExpiration();
}

/**
 * Override the console object to log usig rear-logger.
 * This way we can intercept message coming from TeleBot
 * and format them properly.
 */
function ovverideConsole() {
  console.log = (message, args = []) => {
    const pattern = /^\[bot\.(info|error|plugin)\](.*)/;
    const matches = message.match(pattern);

    if (!matches) {
      logger.log(message, ...args);
      return;
    }

    if (matches.length > 1) {
      const method = matches[1];
      const textMessage = matches[2]
      if (typeof logger[method] === 'function') {
        logger[method](textMessage, ...args);
      }
    }
  }
}

// TODO: pass session cleaner expiration timeout
function handleSessionExpiration() {
  const tick = 1000 * 60; // 1 min
  const timeout = 1000 * 600 // 10 min
  const sessionCleaner = createSessionCleaner({ timeout });
  setTimeout(
    sessionCleaner.cleanSession.bind(sessionCleaner), tick);
}

module.exports = { start }
