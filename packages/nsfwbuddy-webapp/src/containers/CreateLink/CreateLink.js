import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../../components/Bootstrap/Container';
import FormatMessage from '../../components/FormatMessage';
import { getProps, getActions } from './Providers';
import AdvancedOptions from './AdvancedOptions';
import Nsfw from 'nsfwbuddy-shared';
import { localURL } from '../../core/site-url'
import copyTextToClipboard from '../../core/copy-to-clipboard';
import { LinkActionType as ActionType } from '../../actions/Link';
import ResultModal from './ResultModal';
import URLShortner from './URLShortner';
import Footer from '../../components/Footer';
import './CreateLink.css';

class CreateLink extends Component {
  state = {
    sourceURL: '',
    modalIsOpen: false,
    advancedOptionIsOpen: false,
    optionBitmask: 0,
    expirationValue:  Nsfw.expiration.flags.oneWeek,
  }

  componentDidMount() {
    this.props.toggleProgress(false);
  }

  handleToggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  handleToggleAdvancedOptions = event => {
    event.preventDefault();
    this.setState({
      advancedOptionIsOpen: !this.state.advancedOptionIsOpen
    })
  }

  handleURLChange = event => {
    this.setState({
      sourceURL: event.target.value
    });
  }

  handleCreateClick = event => {
    event.preventDefault();

    const sourceURL = this.state.sourceURL.trim();
    const options = this.state.optionBitmask;
    const expiration = this.state.expirationValue;

    if (sourceURL === '') return;

    this.props.toggleProgress(true);
    this.props.createLink({sourceURL, options, expiration}).then(action => {
      if (action.type === ActionType.createLinkSuccess) {
        this.setState({ modalIsOpen: true });
      }
      this.props.toggleProgress(false);
    })
  }

  toggleAdvancedOption = (event, type, mask) => {
    if (type === 'option') {
      let bitmask = this.state.optionBitmask;
      this.setState({
        optionBitmask: bitmask ^= mask
      });
    }
    else if (type === 'expiration') {
      this.setState({
        expirationValue: mask
      });
    }
  }

  getShortURL() {
    return `${localURL}/${this.props.link.shortURL}`;
  }

  copyToClipboard = () => {
    const shortURL = this.getShortURL();
    copyTextToClipboard(shortURL);
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  render() {
    const shortURL = this.getShortURL();
		return(
      <div>
        <Container className="CreateLink">
          <h4 className="display-6">
            <FormatMessage
              id="app.welcome"
              defaultMessage="Share NSFW URLs safely."
              description="URL Shortner welcome message"
          />
          </h4>
          <form>
            <URLShortner
              value={this.state.sourceURL}
              onChange={this.handleURLChange}
              onClick={this.handleCreateClick}
            />
            <AdvancedOptions
              contentValue={this.state.optionBitmask}
              expirationValue={this.state.expirationValue}
              defaultExpiration={Nsfw.expiration.flags.oneWeek}
              isOpen={this.state.advancedOptionIsOpen}
              onClick={this.handleToggleAdvancedOptions}
              onChange={this.toggleAdvancedOption}
            />
          </form>
        </Container>
        <Footer fixed={!this.state.advancedOptionIsOpen} />
        <ResultModal
          isOpen={this.state.modalIsOpen}
          onClose={this.handleToggleModal}
          onConfirm={this.copyToClipboard}>
          {shortURL}
        </ResultModal>
      </div>
		);
	}
}

export default connect(getProps, getActions)(CreateLink);
