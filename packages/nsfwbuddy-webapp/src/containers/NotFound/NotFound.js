import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProps, getActions } from './Providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlink } from '@fortawesome/free-solid-svg-icons'
import FormatMessage from '../../components/FormatMessage';
import Container from '../../components/Bootstrap/Container';
import IconTitle from '../../components/Bootstrap/IconTitle';
import Lead from '../../components/Bootstrap/Lead';
import ActionButtons from '../../components/Bootstrap/ActionButtons';
import './NotFound.css';

class NotFound extends Component {
  componentDidMount() {
    this.props.toggleProgress(false);
  }

  render() {
		return(
			<Container className="NotFound">
        <IconTitle
          separator={true}
          icon={<FontAwesomeIcon icon={faUnlink} size="2x" />}>
          <h3 className="">
            <FormatMessage
              id="app.pageNotFound.title"
              defaultMessage="Page Not Found" />
          </h3>
        </IconTitle>
        <Lead>
          <FormatMessage
            id="app.pageNotFound.body"
            defaultMessage="The page you are looking for doesn't exists." />
        </Lead>
        <ActionButtons>
          <a href="/" className="btn btn-lg btn-primary">
            <FormatMessage id="app.goBack" />
          </a>
        </ActionButtons>
      </Container>
		);
	}
}

export default connect(getProps, getActions)(NotFound);
