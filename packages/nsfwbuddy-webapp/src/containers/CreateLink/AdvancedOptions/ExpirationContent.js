import React, { Component } from 'react';
import Nsfw from 'nsfwbuddy-shared';
import FormGroup from '../../../components/Bootstrap/FormGroup';
import Lead from '../../../components/Bootstrap/Lead';
import FormatMessage from '../../../components/FormatMessage';
import { injectIntl } from 'react-intl';

const { getExpirationMasks, getExpirationLabel } = Nsfw.expiration;

const ExpirationOptions = injectIntl(props =>
  getExpirationMasks().reduce((options, mask) => {
    const newMask = parseInt(mask, 10);
    const label = getExpirationLabel(mask);
    const messageId = 'app.expiration.' + label.toLowerCase();
    const htmlId = label.toLowerCase().replace(' ', '') + '-option';
    options.push(
      <option id={htmlId} key={messageId} value={newMask}>
        {props.intl.formatMessage({
          id: messageId,
          defaultMessage: label
        })}
      </option>
    )
    return options;
  }, [])
);

class ExpirationContent extends Component {
  handleSelectChange = (event) => {
    this.props.onChange(event, 'expiration', parseInt(event.target.value, 10));
  }

  render() {
    return(
      <div className="ExpirationContent">
         <Lead>
            <FormatMessage
              id="app.expiration"
              defaultMessage="Set expiration"
            />:
          </Lead>
          <FormGroup>
            <select
              className="form-control"
              defaultValue={Nsfw.expiration.flags.oneWeek}
              onChange={this.handleSelectChange}
            >
              <ExpirationOptions defaultExpiration={this.props.defaultExpiration} />
            </select>
          </FormGroup>
      </div>
    )
  }
}

export default ExpirationContent;
