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
  amqpUrl: {
    env: 'CLOUDAMQP_URL',
    type: 'string',
    required: true,
  },
  amqpHeartbeat: {
    env: 'CLOUDAMQP_HEARTBEAT',
    type: 'integer',
    required: true,
  },
  amqpRestartInterval: {
    env: 'CLOUDAMQP_RESTART_INTERVAL',
    type: 'integer',
    required: true,
  },
  authorization: {
    env: 'AUTHORIZATION',
    type: 'string',
    required: true,
  },
});

module.exports = config;
