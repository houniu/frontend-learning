const fs = require('fs');
const path = require('path');

/* eslint-disable no-unused-vars */
const after = (times, fn) => (...args) => --times == 0 && fn();
const outPrint = after(1, () => {
  /* eslint-disable no-console */
  console.dir(renderObj);
});
const renderObj = {};
fs.readFile(path.join(__dirname, 'name.txt'), 'utf-8', (err, data) => {
  if (err) throw err;
  renderObj.name = data;
  outPrint();
});
