import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProps, getActions } from './Providers';
import FormatMessage from '../../components/FormatMessage'
import Container from '../../components/Bootstrap/Container'
import Footer from '../../components/Footer'
import Lead from '../../components/Bootstrap/Lead'
import './Privacy.css';

class Privacy extends Component {

  componentDidMount() {
    this.props.toggleProgress(false);
  }

	render() {
		return(
      <div>
  			<Container className="Privacy">
          <h1><FormatMessage id="privacy.title" /></h1>
          <Lead><FormatMessage id="privacy.lead" /></Lead>
          <p><FormatMessage id="privacy.p1" />{' '}
          <FormatMessage id="privacy.p2" /></p>
          <p><FormatMessage id="privacy.p3" />{' '}
            <a href={process.env.REACT_APP_GITHUB_URL}>
              <FormatMessage id="privacy.sourceCode" />
            </a>.
          </p>
  			</Container>
        <Footer fixed={true} />
      </div>
		);
	}
}

export default connect(getProps, getActions)(Privacy);
