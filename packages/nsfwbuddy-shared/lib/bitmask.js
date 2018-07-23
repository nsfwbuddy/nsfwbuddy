/**
 * Check if a given `mask` is contained in the given `bitmask`
 * @param  {number} bitmask Full bitmask to be checked
 * @param  {number} mask    Flag to be tested for inclusion
 * @return {Boolean}        True if `mask` is contained in `bitmask` or false.
 */
function containsMask(bitmask, mask) {
  return bitmask & mask;
}

/**
 * Toggle a given `mask` bit in a given `bitmask`
 * @param  {number} bitmask Bitmask
 * @param  {number} mask    Mask bit
 * @return {number}         Resulting bitmask
 */
function toggleMask(bitmask, mask) {
  return bitmask ^= mask;
}

module.exports = {
  containsMask: containsMask,
  toggleMask: toggleMask
};