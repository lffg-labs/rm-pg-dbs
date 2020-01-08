#! /usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const { run } = require('.');

run()
  .then(() => process.exit(0))
  .catch((error) => console.error(error) || process.exit(1));
