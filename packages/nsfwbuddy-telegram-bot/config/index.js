const env = require('./env');
let config;

if (env.NODE_ENV !== 'production') {
  config = {
    polling: {
      interval: 1000, // Optional. How often check updates (in ms).
      timeout: 0, // Optional. Update polling timeout (0 - short polling).
      limit: 100, // Optional. Limits the number of updates to be retrieved.
      retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
    }
  }
} else {
  config = {
    webhook: {
      url: env.URL, // HTTPS url to send updates to.
      host: env.HOST || '0.0.0.0', // Webhook server host.
      port: env.PORT || 443, // Server port.
      maxConnections: 40 // Optional. Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery
    }
  }

  if (env.KEY) config.key = env.KEY;
  if (env.CERT) config.key = env.CERT;
}

module.exports = Object.assign({}, config, {
  token: env.TELEGRAM_BOT_TOKEN,
  usePlugins: [ 'askUser' ]
});
