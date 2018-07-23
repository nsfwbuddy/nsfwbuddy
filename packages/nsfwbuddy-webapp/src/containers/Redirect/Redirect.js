import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProps, getActions } from './Providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FormattedRelative } from 'react-intl';
import Nsfw from 'nsfwbuddy-shared';
import Button from '../../components/Bootstrap/Button';
import FormGroup from '../../components/Bootstrap/FormGroup';
import Container from '../../components/Bootstrap/Container';
import Lead from '../../components/Bootstrap/Lead';
import IconTitle from '../../components/Bootstrap/IconTitle';
import ActionButtons from '../../components/Bootstrap/ActionButtons';
import FormatMessage from '../../components/FormatMessage';
import { LinkActionType } from '../../actions/Link';
import './Redirect.css';

const TemporaryLinkNote = props => {
  const now = new Date();
  const timeDiff =  Math.abs(props.expireAt.getTime() - now.getTime())
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const diffYears = diffDays / 365;
  if (diffYears >= 100) return(<div></div>);
  return(
    <p className="" style={{marginTop: '2rem'}}>
      <strong>
        <FormatMessage id="app.note" defaultMessage="Note" />:
      </strong>{' '}
      <FormatMessage
        id="app.linkIsTemporary"
        defaultMessage="This link is temporary and will expire"
      />{' '}
      <FormattedRelative
        value={props.expireAt} />.
    </p>
  )
}

const FullLink = props =>
  <div className="FullLink">
    <a href="/#" onClick={props.onClick}>
      {props.isOpen
        ? <FormatMessage id="app.hideLink" defaultMessage="Hide full link" />
        : <FormatMessage id="app.showLink" defaultMessage="Show full link" />
      }
    </a>
    <div
      className="FullUrl"
      style={{display: props.isOpen ? 'block' : 'none'}}
    >
    <p style={{overflowWrap: 'break-word'}}>{props.url}</p>
    </div>
  </div>

class Redirect extends Component {

  state = {
    ageConfirmed: false,
    loaded: false,
    notFound: false,
    linkOpen: false
  }

  componentWillMount () {
    if (!this.props.info.l10n) {
      this.props.getInfo()
    }

    this.props.getLink(this.props.match.params.shortURL).then(action => {
      if (action.type === LinkActionType.getFullLinkSuccess) {
        this.setState({loaded: true, notFound: false});
      } else if (action.type === LinkActionType.getFullLinkFailure) {
        this.props.history.push('/404');
      }
    });
  }

  componentDidMount() {
    this.props.toggleProgress(false);
  }

  getContentMessage() {
    let startMessage = (
      <FormatMessage
        id="app.nsfwMessage"
        defaultMessage={
          "The URL you are about to open is not safe for work or public display"
        }
      />
    );
    const bitmask = this.props.link.options;
    if (!bitmask) return(<span>{startMessage}.</span>);

    const flags = Nsfw.options.getMasks().reduce((labels, mask) => {
      if (!Nsfw.bitmask.containsMask(bitmask, mask)) return labels;
      const label = Nsfw.options.getMaskLabel(mask).toLowerCase();
      labels.push(label);
      return labels;
    }, []);
    const lastFlag = flags.splice(-1);

    // Format the content message based on the number of
    // the content's options flags set.

    let list, lastItem, itMayContain;

    if (flags.length > 0 || lastFlag.length > 0) {
      itMayContain = (
        <span>{' '}
          <FormatMessage
            id="app.itMayContain"
            defaultMessage="and it may contain"
          />{' '}
        </span>
      )
    } else {
      itMayContain = (<span>.</span>)
    }

    if (flags.length === 0 && lastFlag.length === 1) {
      // since there is only 1 flag, just show the list with 1 item without
      // the concluding flag. The single item is contained in the `lastFlag` var
      // since we always remove the last item from `flags`.
      const messagedId = 'app.mask.lower.' + lastFlag;
      list = <span key={messagedId}><FormatMessage id={messagedId} />.</span>
      lastItem = "";
    } else {
      // format the the list of flags by separating multiple items with a comma.
      const separator = flags.length > 1 ? ", " : " ";
      list = flags.map(flag => {
        const messagedId = 'app.mask.lower.' + flag;
        return(
          <span key={messagedId}>
            <FormatMessage
              id={messagedId}
              defaultMessage={flag}
            />{separator}
          </span>
        )
      });
      // format the last item by appending an "and" conjuction.
      lastItem = lastFlag.length > 0
        ? (
            <span>
              <FormatMessage id="app.and" defaultMessage="and" />{' '}
              <FormatMessage
                id={'app.mask.lower.' + lastFlag[0]}
                defaultMessage={lastFlag[0]}
              />.
            </span>
          )
        : (<span></span>)
    }

    return(
      <span className="content-message">
        {startMessage} {itMayContain} {list} {lastItem}
      </span>
    )
  }

  ageIsRequired() {
    const bitmask = this.props.link.options;
    return Nsfw.bitmask.containsMask(bitmask, Nsfw.options.flags.requireAge);
  }

  getAgeConfirmation() {
    if (this.ageIsRequired()) {
      const age = Nsfw.options.getRequiredAge(this.props.link.options);

      return(
        <form className="AgeConfirm">
          <FormGroup>
            <input
              id="require-age-check"
              type="checkbox"
              className="form-check-input"
              onChange={this.toggleAgeRequired}
              value={this.state.ageConfirmed}
            />
            <label className="form-check-label" htmlFor="require-age-check">
              <FormatMessage id="app.ageRequirement" values={{age}} />
            </label>
          </FormGroup>
        </form>
      )
    }
    return <div></div>
  }

  redirectURL = () => {
    window.location = this.props.link.sourceURL
  }

  toggleAgeRequired = () => {
    this.setState({
      ageConfirmed: !this.state.ageConfirmed
    })
  }

  handleCancel = () => {
    window.history.go(-1);
    return false;
  }

  getOpenButton() {
    if (this.ageIsRequired() && !this.state.ageConfirmed) {
      return <Button className="btn-lg" disabled onClick={this.redirectURL}>
        <FormatMessage id="app.openAnyway" />
      </Button>
    }

    return <Button className="btn-lg" look="primary" onClick={this.redirectURL}>
      <FormatMessage id="app.openAnyway" />
    </Button>
  }

  handleToggleLink = event => {
    event.preventDefault();
    this.setState({
      linkOpen: !this.state.linkOpen
    });
  }

	render() {
    if (!this.state.loaded || !this.props.info.l10n) {
      return(<div className="Redirect" />);
    }

    const contentMessage = this.getContentMessage();
    const ageSection = this.getAgeConfirmation();
    const openButton = this.getOpenButton();
    const expireAt = new Date(this.props.link.expireAt);

    return(
			<Container className="Redirect">
        <IconTitle
          separator={true}
          icon={<FontAwesomeIcon icon={faLink} size="2x" />}>
          <h3 className="">NSFW{' '}
            <small className="text-muted">(Not Safe For Work)</small>
          </h3>
        </IconTitle>
        <Lead>{contentMessage}</Lead>
        <TemporaryLinkNote expireAt={expireAt} />
        <FullLink
          url={this.props.link.sourceURL}
          isOpen={this.state.linkOpen}
          onClick={this.handleToggleLink}
        />
        {ageSection}
        <ActionButtons>
          {openButton}{' '}
          <Button className="btn-lg" look="secondary" onClick={this.handleCancel}>
            <FormatMessage id="app.goBack" />
          </Button>
        </ActionButtons>
      </Container>
		);
	}
}

export default connect(getProps, getActions)(Redirect);
