import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getProps, getActions } from './Providers';
import { IntlProvider } from 'react-intl';
import { InfoActionType as ActionType } from '../../actions/Info';
import NavBar from '../../components/NavBar';
import ErrorFrame from '../../components/ErrorFrame';
import ProgressBar from '../../components/ProgressBar';
import Routes from '../../routes';

const DEFAULT_LANG = 'en';
const DEFAULT_MESSAGES= {};

class Shell extends Component {
  state = {
    loaded: false,
    apiFailure: false
  }

  componentWillMount() {
    if (!this.props.info.l10n) {
      this.props.toggleProgress(true);
      this.props.getInfo()
        .then(action => {
          if (action.type === ActionType.getInfoSuccess) {
            this.setState({loaded: true});
          }
          else if (action.type === ActionType.getInfoFailure) {
            this.setState({ apiFailure: true });
            this.props.toggleProgress(false);
          }
        });
    }
  }

  render() {
    if (this.state.apiFailure) {
      return(
        <ErrorFrame
          title="The API endpoint is down"
          message="Unable to contact the API endpoint."
        />
      );
    }

    const {l10n, messages} = this.props.info;
    const progress = <ProgressBar start={this.props.progressIsActive} />

    let content;
    if (!this.state.loaded) {
      content = <div><NavBar brandName={process.env.REACT_APP_BRAND_NAME} /></div>;
    } else {
      content = (
        <IntlProvider
          locale={l10n || DEFAULT_LANG}
          messages={messages || DEFAULT_MESSAGES}>
          <div>
            <NavBar brandName={process.env.REACT_APP_BRAND_NAME} />
            <Routes />
          </div>
        </IntlProvider>
      )
    }

    return(
      <div>
        {progress}
        {content}
      </div>
    )
  }
}

export default connect(getProps, getActions)(Shell);
