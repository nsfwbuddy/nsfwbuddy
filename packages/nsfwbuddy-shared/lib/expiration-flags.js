const ExpirationFlags = {
  oneHour: 1,
  oneDay: 2,
  oneWeek: 4,
  oneMonth: 8,
  oneYear: 16,
  never: 128,
}

const ExpirationLabels = {
  1: '1 hour',
  2: '1 day',
  4: '1 week',
  8: '1 month',
  16: '1 year',
  128: 'never'
}

const ExpirationValues = {
  1: 'oneHour',
  2: 'oneDay',
  4: 'oneWeek',
  8: 'oneMonth',
  16: 'oneYear',
  128: 'never'
}

const ExpirationByHours = {
  1: 1,
  2: 24,
  4: 168,
  8: 720,
  16: 8760,
  128: 876000
}

module.exports = {
  ExpirationFlags: ExpirationFlags,
  ExpirationLabels: ExpirationLabels,
  ExpirationValues: ExpirationValues,
  ExpirationByHours: ExpirationByHours,
  getExpirationLabel: getExpirationLabel,
  getExpirationMasks: getExpirationMasks,
  getExpirationHours: getExpirationHours
};

/////////////////////////

/**
 * Get the expiration label for a given flag
 * @param  {number} mask Expiration flag
 * @return {string}      Expiration text label
 */
function getExpirationLabel(mask) {
  return ExpirationLabels[mask];
}

/**
 * Get all expiration flag values as an array
 * @return {Array<number>} Flag values array
 */
function getExpirationMasks() {
  return Object.keys(ExpirationLabels);
}

/**
 * Return the time-span related to the given mask, in hours.
 * @param  {number} mask Expiration flag
 * @return {number}      Related hour time-span
 */
function getExpirationHours(mask) {
  return Object.keys(ExpirationByHours).indexOf("" + mask) !== -1
    ? ExpirationByHours[mask]
    : 0;
}
