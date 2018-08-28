'use strict';

const express = require('express');

const router = new express.Router();

router.use(require('./getRoot'));
router.use(require('./enqueue/enqueue'));

module.exports = router;
