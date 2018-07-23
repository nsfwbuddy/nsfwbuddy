const { utils } = require('nsfwbuddy-shared');
const alphabet = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
  'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '-', '.', '_', '~', ':', '@', '!', '$', "'", '*', '+', ';', '='
]

module.exports = generateURL;

//////////////////////////////

function generateURL(length = 8) {
  const alphabetLen = alphabet.length;
  let url = '';

  for (let i = 0; i < length; i++) {
    url += alphabet[ utils.randomInt(0, alphabetLen) ];
  }

  return url;
}