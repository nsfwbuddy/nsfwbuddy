import React from 'react';
import Utils from 'nsfwbuddy-shared';
import FormGroup from '../../../components/Bootstrap/FormGroup';
import Lead from '../../../components/Bootstrap/Lead';
import FormatMessage from '../../../components/FormatMessage';

const SelectChekboxes = props => {
  return Utils.options.getMasks().reduce((options, mask) => {
    mask = parseInt(mask, 10);
    const label = Utils.options.getMaskLabel(mask);
    const messageId = 'app.mask.' + label.toLowerCase();
    const htmlId = label.toLowerCase().replace(' ', '') + '-check';
    const isChecked = props.value & mask;
    options.push(
      <div key={htmlId}>
        <input onChange={event => props.onChange(event, 'option', mask)}
          id={htmlId} type="checkbox" className="form-check-input"
          defaultChecked={isChecked} is-checked={isChecked ? 'true' : 'false'}
        />
        <label className="form-check-label" htmlFor={htmlId}>
          <FormatMessage id={messageId} defaultMessage={label} />
        </label>
      </div>
    );

    return options;
  }, [])
}

const SelectContent = props =>
  <div className="SelectContent">
    <Lead>
      <FormatMessage
        id="app.typeOfContent"
        defaultMessage="Specify the type of content"
      />
    </Lead>
    <FormGroup className="form-check">
      <SelectChekboxes value={props.value} onChange={props.onChange} />
    </FormGroup>
  </div>

export default SelectContent;
