'use strict';

const connection = require('./connection');
const logFunctionFactory = require('../services/logFunctionFactory');

const writeInfo = logFunctionFactory.getInfoLogger('Worker Queue');

let channelWrapper;

function onMessage(message) {
  const content = message.content.toString('utf8');
  writeInfo(`Received: ${content}`);
  channelWrapper.ack(message, false);
}

const qName = 'jobs';
channelWrapper = connection.createChannel({
  json: true,
  setup: channel => channel.consume(qName, onMessage),
});

channelWrapper.waitForConnect()
  .then(() => writeInfo('Listening for messages'));
