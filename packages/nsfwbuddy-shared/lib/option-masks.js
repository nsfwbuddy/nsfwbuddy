const bitmaskUtils = require('./bitmask');

const AdvancedOptionFlags = {
  badLanguage: 1,
  nudity: 2,
  violence: 4,
  discrimination: 8,
  drugs: 16,
  gore: 32,
  porn: 64,
  requireAge: 128
};

const AdvancedOptionLables = {
  1: 'Bad Language',
  2: 'Nudity',
  4: 'Violence',
  8: 'Discrimination',
  16: 'Drugs',
  32: 'Gore',
  64: 'Porn',
  128: 'Require age confirmation'
}

module.exports = {
  AdvancedOptionFlags: AdvancedOptionFlags,
  AdvancedOptionLables: AdvancedOptionLables,
  getRequiredAge: getRequiredAge,
  getMaskLabel: getMaskLabel,
  getMasks: getMasks,
  getFlags: getFlags
};

//////////////////////////


/**
 * Get the label for a give mask
 * @param  {number} mask Bitmask's flag
 * @return {string}      Bitmask's label
 */
function getMaskLabel(mask) {
  return AdvancedOptionLables[mask];
}

/**
 * Get all bitmask values as an array except the requireAge mask.
 * @return {Array<number>} Bitmask array
 */
function getMasks() {
  return Object.keys(AdvancedOptionLables)
    .filter(function (mask) {
      return parseInt(mask, 10) !== AdvancedOptionFlags.requireAge;
    });
}

/**
 * Get all bitmask flag names as an array except the requireAge flag name.
 * @return {Array<number>} Bitmask's flag name array
 */
function getFlags() {
  return Object.keys(AdvancedOptionFlags)
    .filter(function (flag) {
      return flag !== 'requireAge';
    });
}

/**
 * Get the corresponding minimum required age for a given mask
 * @param  {number} [mask] Mask value
 * @return {number}        Minimum age for given mask or 14
 */
function getRequiredAge(mask) {
  var bitmask = mask;

  // disable requireAge flag since is not required to define the age threshold.
  if (bitmaskUtils.containsMask(mask, AdvancedOptionFlags.requireAge)) {
    bitmask = bitmaskUtils.toggleMask(bitmask, AdvancedOptionFlags.requireAge)
  }

  if (bitmaskUtils.containsMask(bitmask, AdvancedOptionFlags.gore) ||
      bitmaskUtils.containsMask(bitmask, AdvancedOptionFlags.porn)) {
    return 18;
  }

  if (bitmaskUtils.containsMask(bitmask, AdvancedOptionFlags.violence) ||
      bitmaskUtils.containsMask(bitmask, AdvancedOptionFlags.discrimination) ||
      bitmaskUtils.containsMask(bitmask, AdvancedOptionFlags.drugs)) {
    return 16;
  }

  return 14;
}