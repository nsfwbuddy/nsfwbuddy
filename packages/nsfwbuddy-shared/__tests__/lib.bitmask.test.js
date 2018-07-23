const { bitmask } = require('../index');

it('should return true for bit found in bitmask', () => {
  const testedBitmask = 2 | 4 | 8;
  const testedMask = 4;
  const result = bitmask.containsMask(testedBitmask, testedMask);
  expect(result).toBeTruthy();
});

it('should return false for bit not found in bitmask', () => {
  const testedBitmask = 2 | 4 | 8;
  const testedMask = 16;
  const result = bitmask.containsMask(testedBitmask, testedMask);
  expect(result).toBeFalsy();
});