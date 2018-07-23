const Component = require('./Component');

class MockComponent extends Component {}

it('should assign new props without loosing the others', () => {
  const fnMock = jest.fn();
  const expected = { myVar: 1, myProp: 'test', myFunc: fnMock }
  const component = new MockComponent({myVar: 1});
  component.setProps({myProp: 'test', myFunc: fnMock });
  expect(component.props).toEqual(expected);
})

it('should assign new state without loosing the others', () => {
  const fnMock = jest.fn();
  const expected = {myProp: 'test', myFunc: fnMock }
  const component = new MockComponent({myVar: 1});
  component.setState({myProp: 'test', myFunc: fnMock });
  expect(component.state).toEqual(expected);
})
