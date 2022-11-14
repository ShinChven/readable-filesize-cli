#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const {readableFilesize, collectDirectorySize} = require('.');

const arg = process.argv[2];

const file = path.resolve(arg);

const existed = fs.existsSync(file);

if (existed) {
  const stat = fs.statSync(file);
  if (stat.isFile()) {
    console.log(`${file}`, '\t', readableFilesize(stat.size));
  } else {
    console.log(`${file}`, '\t', readableFilesize(collectDirectorySize(file)));
  }
} else if (!isNaN(arg)) {
  console.log('number size:', readableFilesize(arg));
} else {
  console.log('file or directory not existed');
}
