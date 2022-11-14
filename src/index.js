const fs = require('fs');
const path = require('path');

const readableFilesize = (length) => {

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const exponent = Math.min(Math.floor(Math.log10(length) / 3), units.length - 1);
  const numStr = Number((length / Math.pow(1000, exponent)).toPrecision(3));
  const unit = units[exponent];
  return numStr + unit;

}

const collectDirectorySize = (dir) => {
  const showDetails = process.argv[3] === '--details' || process.argv[3] === '-d';
  const files = fs.readdirSync(dir);
  let size = 0;
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      size += stat.size;
      if (showDetails === true) {
        console.log(`${filePath}`, '\t', readableFilesize(stat.size));
      }
    } else {
      size += collectDirectorySize(filePath);
    }
  }
  return size;
}

module.exports = {readableFilesize, collectDirectorySize};


