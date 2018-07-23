const express = require('express');
const router = express.Router();
const HttpStatus = require('../../core/http-status');
const JsonResponse = require('../../core/json-response');
const Links = require('../repos/Links');
const generateURL = require('../../core/generate-url');
const { utils } = require('nsfwbuddy-shared');
const toFirstLower = require('../../core/to-first-lower');
const getExpirationDate = require('../../core/get-expiration-date');

// Disable link listing by default
/* GET link listing */
// router.get('/', (req, res, next) => {
//   Links.getAll()
//     .then(users => {
//       JsonResponse.OK(res, users);
//     })
//     .catch(err => {
//       JsonResponse.ServerError(res, err.message);
//     })
// });

/* GET link by short URL. */
router.get('/:shortURL', (req, res, next) => {
  Links.getValid(req.params.shortURL)
    .then(link => {
      if (!link || link.length === 0) {
        return JsonResponse.NotFound(res,
          `A link with shortURL ${req.params.shortURL} cannot be found.`
        );
      }
      JsonResponse.OK(res, link);
    })
    .catch(err => {
      JsonResponse.ServerError(res, err.message);
    });
});

/** Insert a new url */
router.post('/', (req, res, next) => {
  if (!req.body.sourceURL) {
    return JsonResponse.Error(res, { message: 'sourceURL is required' })
  }

  return createUniqueURL()
    .then(newURL => {
      let sourceURL = toFirstLower(req.body.sourceURL || '');
      if (!utils.url.hasHttpProtocol(sourceURL)) sourceURL = 'http://' + sourceURL;
      const expireAt = getExpirationDate(req.body.expiration);
      const model = {
        shortURL: req.body.customURL || newURL,
        sourceURL: sourceURL,
        options: req.body.options,
        createdAt: new Date(),
        expireAt: expireAt,
      };

      return Links.insert(model);
    })
    .then(link => JsonResponse.Created(res, link))
    .catch(err => JsonResponse.ServerError(res, { message: err.message }));
});

/**
 * Generate a unique URL by checking the links table for shortURL existance.
 * @return {Promise<string>} A promise that resolves with the new URL.
 */
function createUniqueURL() {
  const newURL = generateURL();
  return Links.exists({ shortURL: newURL })
    .then(exists => {
      if (!exists) return newURL;
      return createUniqueURL();
    });
}

module.exports = router;
