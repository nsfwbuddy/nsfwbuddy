import React from 'react';
import FormGroup from '../../components/Bootstrap/FormGroup';
import Row from '../../components/Bootstrap/Row';
import Column from '../../components/Bootstrap/Column';
import Input from '../../components/Bootstrap/Input';
import Button from '../../components/Bootstrap/Button';
import { FormattedMessage, injectIntl } from 'react-intl';

const URLShortner = injectIntl(props =>
  <FormGroup>
    <Row>
      <Column size="sm-10">
        <Input
          onChange={props.onChange}
          placeholder={props.intl.formatMessage({
            id: 'app.insertURL',
            defaultMessage: 'Insert a URL'
          })}
          name="sourceURL" type="text" value={props.value}/>
      </Column>
      <Column size="sm-2 xs-mt-2">
        <Button
          onClick={props.onClick}
          look="primary">
          <FormattedMessage id="app.shortenURL" defaultMessage="Shorten URL" />
        </Button>
      </Column>
    </Row>
  </FormGroup>
)

export default URLShortner;
