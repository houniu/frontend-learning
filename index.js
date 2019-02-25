const express = require('express');
const path = require('path');
// const fs = require('fs');
// const glob = require('fast-glob');
const port = 3002;
const app = express();
const { log } = console;

app.engine('art', require('express-art-template'));
app.engine('html', require('express-art-template'));

app.set('views', path.join(__dirname, '../../dist'));
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production',
});

app.use(express.static(path.join(__dirname, '../../dist')));

app.listen(process.env.PORT || port, () => {
  log(`Server is now running at port ${port}`);
});
