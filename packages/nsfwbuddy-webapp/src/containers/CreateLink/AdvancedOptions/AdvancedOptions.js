import React, { Component } from 'react';
import FormatMessage from '../../../components/FormatMessage';
import SelectContent from './SelectContent';
import EnforceAgeContent from './EnforceAgeContent';
import ExpirationContent from './ExpirationContent';
import noop from '../../../core/noop';
import './AdvancedOptions.css';

class AdvancedOptions extends Component {
  static defaultProps = {
    isOpen: false,
    contentValue: 0,
    expirationValue: 0,
    ageConfirmation: false,
    onChange: noop,
  };

  render() {
    return(
      <div className="AdvancedOptions">
        <a href="" onClick={this.props.onClick}>
          {
            this.props.isOpen
              ? <FormatMessage id="app.hideOptions" defaultMessage="Show Options" />
              : <FormatMessage id="app.showOptions"  defaultMessage="Hide Options" />
          }
        </a>
        <div id="toggle-options" style={{
          marginTop: '1em',
          display: this.props.isOpen ? 'block' : 'none'}}
        >
          <SelectContent
            value={this.props.contentValue}
            onChange={this.props.onChange}
          />
          <hr/>
          <EnforceAgeContent
            value={this.props.contentValue}
            onChange={this.props.onChange}
          />
          <hr/>
          <ExpirationContent
            defaultExpiration={this.props.defaultExpiration}
            value={this.props.expirationValue}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
}

export default AdvancedOptions;
