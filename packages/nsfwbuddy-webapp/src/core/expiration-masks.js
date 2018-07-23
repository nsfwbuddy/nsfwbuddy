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

function getExpirationLabel(mask) {
  return ExpirationLabels[mask];
}

function getExpirationMasks() {
  return Object.keys(ExpirationLabels);
}

module.exports = {
  ExpirationFlags,
  ExpirationLabels,
  getExpirationLabel,
  getExpirationMasks
};
