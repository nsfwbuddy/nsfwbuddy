/**
 * Queue a function to be executed
 * @return {Function}   A function that will be queued and executed
 */
const queue = (() => {
  const pending = [];
  const next = () => {
    var fn = pending.shift();
    if (fn) {
      fn(next);
    }
  }

  return (fn) => {
    pending.push(fn);
    if (pending.length === 1) {
      next();
    }
  };
})();

function clamp (n, min, max) {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

/**
 * Converts a percentage (`0..1`) to a bar translateX
 * percentage (`-100%..0%`).
 * @return {number}  traslateX percentage
 */

function toBarPercent (value: number): number {
  return (-1 + value) * 100;
}

function getPositioningCSS () {
  // Sniff on document.body.style
  const bodyStyle = document.body.style;

  // Sniff prefixes
  const vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                     ('MozTransform' in bodyStyle) ? 'Moz' :
                     ('msTransform' in bodyStyle) ? 'ms' :
                     ('OTransform' in bodyStyle) ? 'O' : '';

  if (vendorPrefix + 'Perspective' in bodyStyle) {
    // Modern browsers with 3D support, e.g. Webkit, IE10
    return 'translate3d';
  } else if (vendorPrefix + 'Transform' in bodyStyle) {
    // Browsers without 3D support, e.g. IE9
    return 'translate';
  } else {
    // Browsers without translate() support, e.g. IE7-8
    return 'margin';
  }
}

/**
 * Returns the correct CSS for changing the bar's
 * position given an n percentage, and speed, ease and translate position
 */

function barPositionCSS(
  value: number,
  speed: number|string,
  ease: string,
  translate: string
) {
  let barCSS;

  if (translate === 'translate3d') {
    barCSS = { transform: 'translate3d('+ toBarPercent(value) + '%,0,0)' };
  } else if (translate === 'translate') {
    barCSS = { transform: 'translate('+ toBarPercent(value)+ '%,0)' };
  } else {
    barCSS = { 'marginLeft': toBarPercent(value) + '%' };
  }

  barCSS.transition = 'all ' + speed + 'ms ' + ease;

  return barCSS;
}

module.exports = {
  queue,
  clamp,
  toBarPercent,
  barPositionCSS,
  getPositioningCSS
}