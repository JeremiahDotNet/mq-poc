'use strict';

const express = require('express');
const pkgJSON = require('../../package.json');
const gitData = require('../services/getGitData');
const getCommitSlug = require('./getCommitSlug');

const app = express();
const env = app.get('env');

async function getAppInfo() {
  let commitSlug;
  let gitInfo;

  const getSlug = getCommitSlug();
  const getInfo = gitData();
  await Promise.all([getSlug, getInfo])
    .then((values) => {
      [
        commitSlug,
        gitInfo,
      ] = values;
    });

  return new Promise((resolve) => {
    resolve({
      title: pkgJSON.name,
      environment: env,
      version: pkgJSON.version,
      commit: commitSlug || gitInfo.long,
    });
  });
}

module.exports = getAppInfo;
