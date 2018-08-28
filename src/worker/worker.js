'use strict';

const connection = require('./connection');
const logFunctionFactory = require('../services/logFunctionFactory');

const writeInfo = logFunctionFactory.getInfoLogger('Worker Queue');

let channelWrapper;

function onMessage(message) {
  writeInfo(`Received: ${JSON.stringify(message)}`);
  channelWrapper.ack(message, false);
}

const qName = 'jobs';
channelWrapper = connection.createChannel({
  json: true,
  setup: channel => channel.consume(qName, onMessage),
});

channelWrapper.waitForConnect()
  .then(() => writeInfo('Listening for messages'));
