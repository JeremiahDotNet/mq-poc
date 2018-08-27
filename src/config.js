'use strict';

const cfg = require('12factor-config');

const config = cfg({
  appName: {
    env: 'APP_NAME',
    type: 'string',
    required: true,
  },
  debug: {
    env: 'DEBUG',
    type: 'string',
    required: true,
  },
  desiredPort: {
    env: 'PORT',
    type: 'integer',
    required: true,
  },
  nodeEnv: {
    env: 'NODE_ENV',
    type: 'enum',
    values: ['development', 'production'],
    default: 'production',
  },
  ampqUrl: {
    env: 'AMPQ_URL',
    type: 'string',
    required: true,
  },
  ampqPassword: {
    env: 'AMPQ_PASSWORD',
    type: 'string',
    required: true,
  },
  ampqUser: {
    env: 'AMPQ_USER',
    type: 'string',
    required: true,
  },
  authorization: {
    env: 'AUTHORIZATION',
    type: 'string',
    required: true,
  },
});

module.exports = config;
