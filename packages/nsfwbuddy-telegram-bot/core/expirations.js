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

function getExpirationLabel(mask) {
  return ExpirationLabels[mask];
}

function getExpirationMasks() {
  return Object.keys(ExpirationLabels);
}

module.exports = {
  ExpirationFlags,
  ExpirationLabels,
  ExpirationValues,
  getExpirationLabel,
  getExpirationMasks
};
