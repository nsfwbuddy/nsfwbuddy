import React from 'react';
import { utils, options } from 'nsfwbuddy-shared'
import renderer from 'react-test-renderer';
import AdvancedOptions from '../containers/CreateLink/AdvancedOptions';
import { IntlProvider } from 'react-intl';
import { mount } from 'enzyme';

const { flags } = options;

function wrapIntl(component) {
  return <IntlProvider locale="en">{component}</IntlProvider>
}

it('should render with hidden advanced options', () => {
  const component = wrapIntl(
      <AdvancedOptions
        contentValue={0}
        isOpen={false}
        onClick={utils.noop}
        onChange={utils.noop}>http://shorturl</AdvancedOptions>
  );
  const mounted = mount(component);
  expect(mounted.find('#toggle-options').prop('style').display).toBe('none')
});

it('should render checked options', () => {
  // since this are react's controlled inputs we cannot use the "checked"
  // property to test the control. Instead a "is-checked" property has been
  // placed on the component for testing purposes. The value contained in
  // "is-checked" is the same passed to react "defaultChecked" input prop
  const expectedLanguage = '<input id="badlanguage-check" type="checkbox" ' +
    'class="form-check-input" is-checked="true">';
  const expectedNudity = '<input id="nudity-check" type="checkbox" ' +
    'class="form-check-input" is-checked="true">';

  // "Porn" input checkbox should not be checked.
  const expectedPorn = '<input id="porn-check" type="checkbox" ' +
    'class="form-check-input" is-checked="false">';

  const component = wrapIntl(
    <AdvancedOptions
      contentValue={options.flags.badLanguage | options.flags.nudity}
      isOpen={true}
      onClick={utils.noop}
      onChange={utils.noop}>http://shorturl</AdvancedOptions>
  )
  const mounted = mount(component);

  expect(mounted.find('#badlanguage-check').html()).toBe(expectedLanguage)
  expect(mounted.find('#nudity-check').html()).toBe(expectedNudity)
  expect(mounted.find('#porn-check').html()).toBe(expectedPorn)
});

it('should show required age for checked options', () => {
  const expected = '<span id="required-age-label">(18+)</span>'
  const component = wrapIntl(
    <AdvancedOptions
      contentValue={options.flags.gore}
      isOpen={true}
      onClick={utils.noop}
      onChange={utils.noop}>http://shorturl</AdvancedOptions>
  )
  const mounted = mount(component);
  expect(mounted.find('#required-age-label').html()).toEqual(expected);
});

