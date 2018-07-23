const { options } = require('../index');

it('should get an option bitmask label', () => {
  const { getMaskLabel } = options;
  expect(getMaskLabel(options.flags.badLanguage)).toBe('Bad Language');
  expect(getMaskLabel(options.flags.nudity)).toBe('Nudity');
  expect(getMaskLabel(options.flags.violence)).toBe('Violence');
  expect(getMaskLabel(options.flags.discrimination)).toBe('Discrimination');
  expect(getMaskLabel(options.flags.drugs)).toBe('Drugs');
  expect(getMaskLabel(options.flags.gore)).toBe('Gore');
  expect(getMaskLabel(options.flags.porn)).toBe('Porn');
  expect(getMaskLabel(options.flags.requireAge)).toBe('Require age confirmation');

  // if the mask s not found returns the default value: undefined.
  expect(getMaskLabel(512)).toBeUndefined();
});

it('should get all bitmask values as an array', () => {
  const result = options.getMasks();
  expect(Array.isArray(result)).toBeTruthy();
  expect(result.length).toBe(7);
});

it('should get all flag values as an array', () => {
  const result = options.getFlags();
  expect(Array.isArray(result)).toBeTruthy();
  expect(result.length).toBe(7);
});

it('should get required age for bitmask value', () => {
  const { getRequiredAge } = options;
  expect(getRequiredAge(options.flags.badLanguage)).toBe(14);
  expect(getRequiredAge(options.flags.nudity)).toBe(14);
  expect(getRequiredAge(options.flags.violence)).toBe(16);
  expect(getRequiredAge(options.flags.discrimination)).toBe(16);
  expect(getRequiredAge(options.flags.drugs)).toBe(16);
  expect(getRequiredAge(options.flags.gore)).toBe(18);
  expect(getRequiredAge(options.flags.porn)).toBe(18);

  // if the mask s not found returns the default value: value.
  expect(getRequiredAge(512)).toBe(14);
});