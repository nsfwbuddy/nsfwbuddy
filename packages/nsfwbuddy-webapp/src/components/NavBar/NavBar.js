import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import './NavBar.css';

import Container from '../Bootstrap/Container';
import NavBar from '../Bootstrap/NavBar';
import Brand from '../Bootstrap/NavBar/Brand';

class Navbar extends Component {
  static propTypes = {
    brandName: PropTypes.string.isRequired,
  };

  static defaultProps = {
    // define your default props values here
  };

  render() {
    return(
      <NavBar className="Navbar" theme="light" expand="true">
        <Container fluid="false">
          <ul className="nav navbar-nav navbar-logo mx-auto">
            <li className="nav-item">
              <Brand href="/">
                <FontAwesomeIcon icon={faUserSecret} />
                <span style={{margin: '0.33rem'}} />
                {this.props.brandName}
              </Brand>
            </li>
          </ul>
        </Container>
      </NavBar>
    );
  }
}

export default Navbar;
