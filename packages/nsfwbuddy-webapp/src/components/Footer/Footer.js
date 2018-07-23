import React from 'react';
import FormatMessage from '../../components/FormatMessage';
import Container from '../../components/Bootstrap/Container';
import './Footer.css';

const Footer = props =>
  <div className={`Footer ${props.fixed ? 'fixed' : 'not-fixed'}`}>
    <Container>
      <div className="d-flex justify-content-center">
        <a className="footerLink" href="/privacy">
          <FormatMessage id="app.privacy" defaultMessage="Privacy" />
        </a>
        <a className="footerLink" href="/information">
          <FormatMessage id="app.information" defaultMessage="Information" />
        </a>
        <a className="footerLink"
          href={process.env.REACT_APP_TELEGRAM_BOT_URL}>
          <FormatMessage id="app.telegram" defaultMessage="Telegram" />
        </a>
        <a className="footerLink d-hide-xs"
          href={process.env.REACT_APP_GITHUB_URL}>
          <FormatMessage id="app.github" defaultMessage="Github" />
        </a>
      </div>
    </Container>
  </div>

export default Footer;
