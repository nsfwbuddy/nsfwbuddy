const HttpStatus = require('./http-status');

module.exports = {
  Error: (res, data) =>
    res.status(HttpStatus.OK).json({
      ok: false,
      status: 200,
      code: 'Error',
      data
    }),
  OK: (res, data) =>
    res.status(HttpStatus.OK).json({
      ok: true,
      status: HttpStatus.OK,
      code: 'OK',
      data,
    }),
  Created: (res, data) =>
    res.status(HttpStatus.Created).json({
      ok: true,
      status: HttpStatus.Created,
      code: 'Created',
      data
    }),
  NoContent: (res, data) =>
    res.status(HttpStatus.NoContent).json({
      ok: true,
      status: HttpStatus.NoContent,
      code: 'No Content',
      data
    }),
  BadRequest: (res, error) =>
    res.status(HttpStatus.BadRequest).json({
      ok: false,
      status: HttpStatus.BadRequest,
      code: 'Bad Request',
      error
    }),
  Unauthorized: (res, error) =>
    res.status(HttpStatus.Unauthorized).json({
      ok: false,
      status: HttpStatus.Unauthorized,
      code: 'Unauthorized',
      error
    }),
  Forbidden: (res, error) =>
    res.status(HttpStatus.Forbidden).json({
      ok: false,
      status: HttpStatus.Forbidden,
      code: 'Forbidden',
      error
    }),
  NotFound: (res, error) =>
    res.status(HttpStatus.NotFound).json({
      ok: false,
      status: HttpStatus.NotFound,
      code: 'Not Found',
      error
    }),
  Conflict: (res, error) =>
    res.status(HttpStatus.Conflict).json({
      ok: false,
      status: HttpStatus.Conflict,
      code: 'Conflict',
      error
    }),
  ServerError: (res, error) =>
    res.status(HttpStatus.InternalServerError).json({
      ok: false,
      status: HttpStatus.InternalServerError,
      code: 'Internal Server Error',
      error
    })
}
