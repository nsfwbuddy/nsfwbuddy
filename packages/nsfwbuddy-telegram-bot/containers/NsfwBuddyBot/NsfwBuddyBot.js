const TeleBot = require('telebot');
const { getActions, getProps } = require('./Providers');
const { connect } = require('../../core/store');
const { siteURL } = require('../../core/site-url');
const { formatMessage } = require('../../core/intl');
const Component = require('../../core/Component');
const AdvancedOptions = require('../../components/AdvancedOptions');

class NsfwBuddyBot extends Component {
  constructor(props) {
    super(props);

    this.props.bot = new TeleBot(props.config);
    this.advancedOptions = new AdvancedOptions(Object.assign(this.props, {
      onDone: this.createShortURL.bind(this),
      onCancel: this.handleCancel.bind(this)
    }));
  }

  componentWillReceiveProps(props) {
    this.advancedOptions.setProps(props);
  }

  configureBot() {
    this.props.bot.on('/start', this.handleStart.bind(this));
    this.props.bot.on('ask.sourceURL', this.handleSourceURL.bind(this));
  }

  start() {
    this.props.bot.start();
  }

  handleStart(msg) {
    this.props.createSession(msg.from);
    const languageCode = msg.from.language_code || "en-EN";
    const locale = languageCode.substr(0,2);
    const message = formatMessage(locale, {
      id: 'bot.welcome',
      defaultMessage: 'Welcome stranger!'
    });
    return this.props.bot.sendMessage(
      msg.from.id,
      message,
      { ask: 'sourceURL' }
    );
  }

  handleSourceURL(msg) {
    const id = msg.from.id;
    const sourceURL = msg.text;
    const user = this.props.getUser(id)

    this.props.updateSession(id, { data: { sourceURL } });
    const yes = formatMessage(user.locale, {
      id: 'bot.yes',
      defaultMessage: 'Yes'
    });
    const no = formatMessage(user.locale, {
      id: 'bot.no',
      defaultMessage: 'No'
    });
    const cancel = formatMessage(user.locale, {
      id: 'bot.cancel',
      defaultMessage: 'Cancel'
    });

    const replyMarkup = this.props.bot.keyboard([
      [no],
      [yes],
      [cancel]
    ])
    const options = { replyMarkup, ask: 'advancedOptions' };
    const message = formatMessage(user.locale, {
      id: 'bot.setAdvancedOptions',
      defaultMessage: 'Great. Do you want to set the advanced options?'
    });

    return this.props.bot.sendMessage(id, message, options);
  }

  handleCancel(id, user) {
    this.props.destroySession(id);
    return this.props.bot.sendMessage(id, formatMessage(user.locale, {
      id: 'bot.maybeNextTime',
      defaultMessage: 'Ok, maybe next time.'
    }), {replyMarkup: 'hide'});
  }

  createShortURL(id, user) {
    const replyMarkup = 'hide';
    return this.props.bot.sendMessage(id, formatMessage(user.locale, {
        id: 'bot.createLink',
        defaultMessage: "Just a moment..."
      }), {replyMarkup})
      .then(() => this.props.createLink(id, user.data))
      .then(action => {
        const user = this.props.getUser(id);
        this.props.destroySession(id);

        if (action.type === 'createLinkSuccess') {
          const newUrlMessage = formatMessage(user.locale, {
            id: 'bot.newUrl',
            defaultMessage: "OK, here's your new URL!"
          });
          return this.props.bot.sendMessage(id, newUrlMessage, {replyMarkup})
            .then(() => this.props.bot.sendMessage(
              id, `${siteURL}/r/${user.data.shortURL}`, {replyMarkup})
            );
        }

        if (action.type === 'createLinkFailure') {
          const tryAgainMessage = formatMessage(user.locale, {
            id: 'bot.tryAgain',
            defaultMessage: 'Sorry, something got wrong. Try again!'
          });
          console.log('[bot.error] error: ', action.error)
          return this.props.bot.sendMessage(id, tryAgainMessage, {replyMarkup});
        }
      })
  }
}

module.exports = connect(NsfwBuddyBot)(getActions, getProps);
