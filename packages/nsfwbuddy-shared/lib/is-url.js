module.exports = {
  isURL,
  hasHttpProtocol
};

/////////////////////////

/**
 * Test if the given text is a url
 * @param  {string}  text Text to be tested
 * @return {Boolean}      True if text is a url, oterwise false
 */
function isURL(text) {
  var pattern = new RegExp('^((https?|ftp):\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i');
  return pattern.test(text);
}

/**
 * Check if the given text has an http protocol
 * @param  {string}  text Text to be tested
 * @return {Boolean}      True if a protocol is found, otherwise false.
 */
function hasHttpProtocol(text) {
  return /^https?:\/\//i.test(text);
}