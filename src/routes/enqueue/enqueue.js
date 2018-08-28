'use strict';

const { Router } = require('express');
const enqueue = require('../../services/queue/enqueue');

const router = new Router();

router.post(
  '/enqueue', async (request, response, next) => {
    try {
      enqueue(request.body);
      response.status(200);
      response.end();
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
