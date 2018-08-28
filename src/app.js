'use strict';

const express = require('express');
const middlewareFactory = require('./app-middleware/middlewareFactory');
const config = require('./config');
const initializeQueue = require('./services/queue/initializeQueue');

const app = express();

app.use(middlewareFactory(config));
initializeQueue();

module.exports = app;
