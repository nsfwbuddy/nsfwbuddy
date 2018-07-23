const { getActions, getProps } = require('./Providers');
const { connect } = require('../../core/store');
const Component = require('../../core/Component');

class SessionCleaner extends Component {
  cleanSession() {
    this.props.cleanSession(this.props.timeout);
    console.log('[bot.info] session cleaned');
  }
}

SessionCleaner.defaultProps = {
  timeout: 1000 * 600 // 10 min
}

module.exports = connect(SessionCleaner)(getActions, getProps);