const express = require('express');
const router = express.Router();
const JsonResponse = require('../../core/json-response');
const acceptLanguage = require('accept-language');

acceptLanguage.languages(['en', 'it']);

router.get('/', (req, res, next) => {
  let l10n = acceptLanguage.get(req.headers['accept-language'] || 'en');
  return JsonResponse.OK(res, {l10n});
});

module.exports = router;
