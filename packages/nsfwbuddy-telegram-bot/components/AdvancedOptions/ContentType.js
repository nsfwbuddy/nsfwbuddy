const Component = require('../../core/Component');
const { formatMessage } = require('../../core/intl');
const Nsfw = require('nsfwbuddy-shared');

const { getMasks, getMaskLabel } = Nsfw.options;
const { containsMask, toggleMask } = Nsfw.bitmask;

class ContentType extends Component {

  constructor(props) {
    super(props);
    this.configureBot();
  }

  configureBot() {
    this.props.bot.on('callbackQuery', this.handleContentSelection.bind(this));
  }

  mount(msg) {
    const id = msg.from.id;
    const user = this.props.getUser(id);
    this.setState({
      initialOption: { data: { options: user.data.options } }
    });

    let replyMarkup = this.getOptionKeyboard(id);
    const message = formatMessage(user.locale, {id: 'bot.setContentType.help'});

    return this.props.bot.sendMessage(id, message, {replyMarkup: 'hide'})
      .then(() =>
        this.getSelectedContentType(msg))
      .then(contentType =>
        this.props.bot.sendMessage(id, contentType, {replyMarkup}))
      .catch(
        err => console.error(err))
  }

  handleContentSelection(msg) {
    const id = msg.from.id;
    const user = this.props.getUser(id);
    const mask = msg.data;
    const { bot } = this.props;
    const message = {
      chatId: msg.message.chat.id,
      messageId: msg.message.message_id
    };

    if (mask === 'done') {
      return this.props.onDone(message, msg);
    }

    if (mask === 'cancel') {
      this.props.updateSession(id, this.state.initialOption);
      return this.getSelectedContentType(msg)
        .then(contentType => {
          this.props.onCancel(message, contentType, msg)
        });
    }

    toggleMask(user.data.options, parseInt(msg.data));
    this.props.updateSession(msg.from.id, {
      data: {
        options: toggleMask(user.data.options, msg.data)
      }
    });

    return bot.answerCallbackQuery(msg.id)
      .then(() => {
        const replyMarkup = this.getOptionKeyboard(msg.from.id);
        return this.getSelectedContentType(msg)
          .then(contentTypeText =>
            bot.editMessageText(message, contentTypeText, {replyMarkup})
          );
      });
  }

  getSelectedContentType(msg) {
    return new Promise((resolve, reject) => {
      const user = this.props.getUser(msg.from.id);
      const { options } = user.data;
      const flags = getMasks().reduce((labels, mask) => {
        if (!containsMask(options, mask)) return labels;
        const label = getMaskLabel(mask).toLowerCase();
        labels.push(formatMessage(user.locale, {
          id: 'bot.mask.' + label
        }));
        return labels;
      }, []);
      const lastFlag = flags.splice(-1);

      let list, lastItem;

      if (flags.length === 0 && lastFlag.length === 1) {
        list = lastFlag[0];
        lastItem = ""
      } else if (flags.length === 0 && lastFlag.length === 0) {
        list = "";
        lastItem = "";
      } else {
        list = flags.join(", ");
        lastItem = formatMessage(user.locale, {id: 'bot.and'}) + " "
          + (lastFlag[0] || "");
      }

      const contentType = formatMessage(user.locale, {
        id: 'bot.selectedContent',
        defaultMessage: 'Content type'
      });
      resolve(`${contentType}: ${list} ${lastItem}`);
    });
  }

  getOptionKeyboard(id, selectedOptions) {
    const user = this.props.getUser(id);
    const options = getMasks().map(mask => {

      const label = getMaskLabel(mask);
      return this.props.bot.inlineButton(
        formatMessage(user.locale, {
          id: 'bot.mask.' + label.toLowerCase(),
          defaultMessage: label
        }),
        { callback: mask }
      )
    })
    const itemPerRow = 3
    let keyboardButtons = [];

    while (options.length > 0) {
      const rowButtons = options.splice(0, itemPerRow)
      keyboardButtons.push(rowButtons);
    }

    let lastRow = keyboardButtons.pop();
    const doneButton = this.props.bot.inlineButton(
      formatMessage(user.locale, {id: 'bot.done'}),
      { callback: 'done' }
    );
    const cancelButton = this.props.bot.inlineButton(
      formatMessage(user.locale, {id: 'bot.cancel'}),
      { callback: 'cancel' }
    );
    const lastButton = lastRow.pop();
    lastRow = lastRow.concat([cancelButton, lastButton, doneButton]);
    keyboardButtons.push(lastRow);

    return this.props.bot.inlineKeyboard(keyboardButtons);
  }
}

module.exports = ContentType;
