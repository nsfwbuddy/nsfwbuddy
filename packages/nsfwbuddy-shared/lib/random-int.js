module.exports = randomInt;

////////////////////////////

/**
 * Generate a random integer between `min` and `max`
 * @param  {number} [min] Min range value
 * @param  {number} [max] Max range value
 * @return {number}       Random integer between `min` and `max`
 */
function randomInt(min, max) {
  min = min || 1;
  max = max || 100;

  return Math.floor(Math.random() * (max - min) + min);
}