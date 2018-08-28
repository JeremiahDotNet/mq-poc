'use strict';

const amqp = require('amqp-connection-manager');
const logFunctionFactory = require('../services/logFunctionFactory');
const config = require('../config');

const writeInfo = logFunctionFactory.getInfoLogger('Worker Queue');

const url = `${config.amqpUrl}?heartbeat=${config.amqpHeartbeat}`;
const connection = amqp.connect([url]);
connection.on('connect', () => writeInfo('Connected'));
connection.on('disconnect', params => writeInfo(`Disconnected\n${params.err.stack}`));

module.exports = connection;
