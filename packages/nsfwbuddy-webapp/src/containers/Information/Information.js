import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProps, getActions } from './Providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import FormatMessage from '../../components/FormatMessage'
import Container from '../../components/Bootstrap/Container'
import Footer from '../../components/Footer'
import Lead from '../../components/Bootstrap/Lead'
import IconTitle from '../../components/Bootstrap/IconTitle'
import './Information.css';

class Information extends Component {

  componentDidMount() {
    this.props.toggleProgress(false);
  }

	render() {
		return(
      <div>
			<Container className="Information">
        <h1><FormatMessage id="info.title" /></h1>
        <Lead>
          <FormatMessage id="info.lead" description="Introduction" />
        </Lead>
        <p>
          <FormatMessage id="info.p1" />
        </p>
        <IconTitle
          icon={<FontAwesomeIcon icon={faSlidersH} size="2x" />}>
          <h3><FormatMessage id="info.title2" /></h3>
        </IconTitle>
        <p><FormatMessage id="info.p2" /></p>
        <p><FormatMessage id="info.p3" /></p>
        <IconTitle
          icon={<FontAwesomeIcon icon={faClock} size="2x" />}>
          <h3><FormatMessage id="info.title3" /></h3>
        </IconTitle>
        <p><FormatMessage id="info.p4" /></p>
        <p><FormatMessage id="info.p5" /></p>
			</Container>
      <Footer />
      </div>
		);
	}
}

export default connect(getProps, getActions)(Information);
