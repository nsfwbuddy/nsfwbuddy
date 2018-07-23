const Component = require('../../core/Component');
const { formatMessage } = require('../../core/intl');
const ContentType = require('./ContentType');
const AgeConfirmation = require('./AgeConfirmation');
const Expiration = require('./Expiration');

class AdvancedOptions extends Component {
  constructor(props) {
    super(props);
    this.configureBot();

    this.contentType = new ContentType(Object.assign({}, props, {
      onDone: this.handleContentTypeDone.bind(this),
      onCancel: this.handleContentTypeCancel.bind(this),
    }));

    this.ageConfirmation = new AgeConfirmation(Object.assign({}, props, {
      onDone: this.handleAgeConfirmationDone.bind(this),
      onCancel: this.handleAgeConfirmationCancel.bind(this)
    }))

    this.expiration = new Expiration(Object.assign({}, props, {
      onDone: this.handleExpirationDone.bind(this),
      onCancel: this.handleExpirationDone.bind(this)
    }));
  }

  configureBot() {
    this.props.bot.on('ask.advancedOptions', this.handleAdvancedOptions.bind(this));
    this.props.bot.on('ask.optionType', this.handleConfigureOption.bind(this));
  }

  handleContentTypeDone(message, msg) {
    const replyMarkup = 'hide';
    const id = msg.from.id;
    const user = this.props.getUser(msg.from.id);
    const optionTypeMarkup = this.getOptionTypeMarkup(user);
    const optionTypeMessage = this.getOptionTypeMessage(user);

    return this.props.bot.answerCallbackQuery(msg.id, 'ok', {replyMarkup})
      .then(() =>
        this.props.bot.sendMessage(id, optionTypeMessage, optionTypeMarkup))
  }

  handleContentTypeCancel(message, contentTypeText, msg) {
    const id = msg.from.id;
    const replyMarkup = 'hide';
    let user = this.props.getUser(id);
    const optionTypeMarkup = this.getOptionTypeMarkup(user);
    const optionTypeMessage = this.getOptionTypeMessage(user);
    const emptyKeyboard = {replyMarkup: this.props.bot.inlineKeyboard([])}

    return this.props.bot.answerCallbackQuery(msg.id)
      .then(() =>
        this.props.bot.editMessageText(message, contentTypeText, emptyKeyboard))
      .then(() =>
        this.props.bot.sendMessage(id, optionTypeMessage, optionTypeMarkup))
      .catch(err => console.error(err));
  }

  handleAgeConfirmationDone(msg) {
    const id = msg.from.id;
    const user = this.props.getUser(id);
    const optionTypeMarkup = this.getOptionTypeMarkup(user);
    const optionTypeMessage = this.getOptionTypeMessage(user);

    const message = formatMessage(user.locale, {
      id: 'bot.ageConfirm.activated',
      defaultMessage: 'Age confirmation activated'
    });
    return this.props.bot.sendMessage(id, message, {replyMarkup: 'hide'})
      .then(() =>
        this.props.bot.sendMessage(id, optionTypeMessage, optionTypeMarkup));
  }

  handleAgeConfirmationCancel(msg, wasActive) {
    const id = msg.from.id;
    const user = this.props.getUser(id);
    const optionTypeMarkup = this.getOptionTypeMarkup(user);
    const optionTypeMessage = this.getOptionTypeMessage(user);

    if (wasActive) {
      const message = formatMessage(user.locale, {
        id: 'bot.ageConfirm.activated',
        defaultMessage: 'Age confirmation deactivated'
      });
      return this.props.bot.sendMessage(id, message, {replyMarkup: 'hide'})
        .then(() =>
          this.props.bot.sendMessage(id, optionTypeMessage, optionTypeMarkup));
    }

    return this.props.bot.sendMessage(id, optionTypeMessage, optionTypeMarkup);
  }

  handleExpirationDone(msg) {
    const id = msg.from.id;
    const user = this.props.getUser(id);
    const optionTypeMarkup = this.getOptionTypeMarkup(user);
    const optionTypeMessage = this.getOptionTypeMessage(user);

    this.props.bot.sendMessage(id, optionTypeMessage, optionTypeMarkup);
  }

  handleAdvancedOptions(msg) {
    const id = msg.from.id;
    const user = this.props.getUser(id);
    const yesMessage = formatMessage(user.locale, {id: 'bot.yes'});
    const cancelMessage = formatMessage(user.locale, {id: 'bot.cancel'});
    const showAdvancedOption = msg.text === yesMessage;

    if (msg.text === cancelMessage) {
      return this.props.onCancel(id, user);
    }

    if (showAdvancedOption) {
      return this.props.bot.sendMessage(id, formatMessage(user.locale, {
        id: 'bot.setAdvancedOptions.askConfiguration',
        defaultMessage: 'What would you like to configure?'
      }), this.getOptionTypeMarkup(user));
    }

    this.props.onDone(id, user);
  }

  handleConfigureOption(msg) {
    const id = msg.from.id;
    const user = this.props.getUser(id);
    const optionType = msg.text;
    const { bot } = this.props;

    const contentType = formatMessage(user.locale, {
      id: 'bot.setContentType',
      defaultMessage: 'Content type'
    });
    const ageConfirmation = formatMessage(user.locale, {
      id: 'bot.requireAge',
      defaultMessage: 'Age confirmation'
    })
    const expiration = formatMessage(user.locale, {
      id: 'bot.setExpiration',
      defaultMessage: 'Link expiration'
    });
    const done = formatMessage(user.locale, {
      id: 'bot.done',
      defaultMessage: 'Done'
    });
    const cancel = formatMessage(user.locale, {
      id: 'bot.cancel',
      defaultMessage: 'Cancel'
    });

    switch (optionType) {
      case contentType:
        return this.contentType.mount(msg);
      case ageConfirmation:
        return this.ageConfirmation.mount(msg);
      case expiration:
        return this.expiration.mount(msg);
      case done:
        return this.props.onDone(id, user);
      case cancel:
        return this.props.onCancel(id, user);
      default:
        break;
    }
  }

  getOptionTypeMessage(user) {
    return formatMessage(user.locale, {
      id: 'bot.selectAnotherOption',
      defaultMessage: 'Select another option or tap'
    }) + " " + formatMessage(user.locale, {
      id: 'bot.done',
      defaultMessage: 'Done'
    }) + " " + formatMessage(user.locale, {
      id: 'bot.toComplete',
      defaultMessage: 'to complete'
    });
  }

  getOptionTypeMarkup(user) {
    return {
      replyMarkup: this.props.bot.keyboard([
        [formatMessage(user.locale, {
          id: 'bot.setContentType',
          defaultMessage: 'Content type'
        })],
        [formatMessage(user.locale, {
          id: 'bot.requireAge',
          defaultMessage: 'Age requirement'
        })],
        [formatMessage(user.locale, {
          id: 'bot.setExpiration',
          defaultMessage: 'Link expiration'
        })],
        [formatMessage(user.locale, {
          id: 'bot.cancel',
          defaultMessage: 'Cancel'
        }),
        formatMessage(user.locale, {
          id: 'bot.done',
          defaultMessage: 'Done'
        })],
      ]),
      ask: 'optionType'
    };
  }
}

module.exports = AdvancedOptions;
