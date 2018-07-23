import React from 'react';
import { utils } from 'nsfwbuddy-shared';
import renderer from 'react-test-renderer';
import ResultModal from './ResultModal';
import { mount } from 'enzyme';

// Suppress ErrorBoundary console.error messages
let consoleError;
beforeEach(() => {
  consoleError = console.error;
  console.error = utils.noop;
});

afterEach(() => {
  console.error = consoleError;
});

it('should render shortURL', () => {
  const shortURL = "https://example.org/l33t";
  const expectedHtml = '<input id="shortURL" type="text" readonly="" class="form-control" value="' + shortURL + '">'
  const component = <ResultModal
    isOpen={true}
    onClose={utils.noop}
    onConfirm={utils.noop}>
    {shortURL}
  </ResultModal>
  const mounted = mount(component);
  expect(mounted.find('input#shortURL').html()).toEqual(expectedHtml)
});
