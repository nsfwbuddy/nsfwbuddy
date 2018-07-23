import React from 'react'
import Nsfw from 'nsfwbuddy-shared';
import FormGroup from '../../../components/Bootstrap/FormGroup';
import Lead from '../../../components/Bootstrap/Lead';
import FormatMessage from '../../../components/FormatMessage';

const { getMaskLabel, flags, getRequiredAge } = Nsfw.options;

const EnforceAgeLabel = props => {
  const requiredAge = getRequiredAge(props.value);
  const requiredAgeLabel = requiredAge
    ? <span id="required-age-label">({requiredAge}+)</span>
    : "";
  const maskLabel = getMaskLabel(flags.requireAge);
  const messageId = 'app.mask.' + maskLabel.toLowerCase();
  return <div>
    <FormatMessage id={messageId} defaultMessage={maskLabel} />{' '}
    {requiredAgeLabel}
  </div>
}

const EnforceAgeContent = props =>
  <div className="EnforceAgeContent">
    <Lead>
      <FormatMessage
        id="app.ageConfirmation"
        defaultMessage="Enforce age confirmation"
      />:
    </Lead>
    <FormGroup className="form-check">
      <input
        id="age-confirm-check"
        type="checkbox"
        className="form-check-input"
        onChange={
          event =>
            props.onChange(event, 'option', flags.requireAge)
        }
      />
      <label
        id="age-confirm-label"
        className="form-check-label"
        htmlFor="age-confirm-check">
        <EnforceAgeLabel value={props.value} />
      </label>
    </FormGroup>
  </div>

export default EnforceAgeContent;
