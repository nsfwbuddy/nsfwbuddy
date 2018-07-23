const Component = require('../../core/Component');
const { formatMessage } = require('../../core/intl');
const Nsfw = require('nsfwbuddy-shared');

const { getRequiredAge, flags } = Nsfw.options;
const { containsMask, toggleMask } = Nsfw.bitmask;

class AgeConfirmation extends Component {
  constructor(props) {
    super(props);
    this.configureBot();
  }

  configureBot() {
    this.props.bot.on('ask.ageConfirm', this.handleAgeConfirm.bind(this));
  }

  mount(msg) {
    const id = msg.from.id;
    const user = this.props.getUser(id);
    const requiredAge = getRequiredAge(user.data.options);
    const description = formatMessage(user.locale, {
      id: 'bot.ageConfirmation',
      defaultMessage: 'Based on the selected content type, the current minimum age requirement is set to'
    }) + " " + requiredAge + ". " + formatMessage(user.locale, {
      id: 'bot.ageConfirmation.confirm',
      defaultMessage: 'Would like to activate age confirmation for your url?'
    })

    const yes = formatMessage(user.locale, {
      id: 'bot.yes',
      defaultMessage: 'Yes'
    });
    const no = formatMessage(user.locale, {
      id: 'bot.no',
      defaultMessage: 'No'
    });
    const replyMarkup = this.props.bot.keyboard([
      [no],
      [yes]
    ])

    const options = {replyMarkup, ask: 'ageConfirm'};
    return this.props.bot.sendMessage(id, description, options);
  }

  handleAgeConfirm(msg) {
    const id = msg.from.id;
    const user = this.props.getUser(id);
    const yesMessage = formatMessage(user.locale, {id: 'bot.yes'});
    const shouldActivate = msg.text === yesMessage;

    if (shouldActivate) {
      this.props.updateSession(id, {
        data: {
          options: toggleMask(user.data.options, AdvancedOptionFlags.requireAge)
        }
      });
      return this.props.onDone(msg)
    }

    return this.props.onCancel(msg,
      containsMask(user.data.options, AdvancedOptionFlags.requireAge));
  }
}

module.exports = AgeConfirmation;
