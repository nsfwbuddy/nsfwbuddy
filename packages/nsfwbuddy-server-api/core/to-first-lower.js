module.exports = (str) => str.replace(
  /\w\S*/g, function(txt){return txt.charAt(0).toLowerCase() + txt.substr(1);});