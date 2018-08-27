'use strict';

module.exports = [
  /* eslint-disable global-require */
  require('./bodyParserJsonFactory'),
  require('./bodyParserUrlEncodeFactory'),
  require('./compressionFactory'),

  // Routes should immediately precede Error Handlers
  require('./routesFactory'),
  require('./unmatchedRouteHandlerFactory'),

  // Make sure configureErrorHandler is LAST!!!
  require('./errorHandlerFactory'),
];
