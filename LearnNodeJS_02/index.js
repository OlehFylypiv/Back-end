const express = require('express');
const app = express();

const router = require('./api');

app.use(router);

app.listen(3000, () => {
    console.log('Started!');
});