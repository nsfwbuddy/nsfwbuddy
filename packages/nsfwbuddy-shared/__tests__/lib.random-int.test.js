const { utils } = require('../index');

it('should get a random int between default values 1 and 100', () => {
  let count = 0;
  let maxCount = 5;
  let prevResult = -1;
  const min = 0, max = 100;
  for(let i = 0; i < 100; i++) {
    const result = utils.randomInt();
    if (result === prevResult) count++;
    if (count >= maxCount) throw new Error('The random int is always ' + result);
    expect(result >= min && result <= max).toBeTruthy();
    prevResult = result;
  }
});

it('should get a random int between custom values 768 and 1024', () => {
  let count = 0;
  let maxCount = 5;
  let prevResult = -1;
  const min = 768, max = 1024;
  for(let i = 0; i < 100; i++) {
    const result = utils.randomInt(min, max);
    if (result === prevResult) count++;
    if (count >= maxCount) throw new Error('The random int is always ', result);
    expect(result >= min && result <= max).toBeTruthy();
    prevResult = result;
  }
});