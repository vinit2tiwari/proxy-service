const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.text());

const limitCheck = require('./limitChecker');
const proxy = require('./proxy');

//Middleware to chek limit consumption of api per user
app.use(limitCheck);
//Middleware to handle proxy request
app.use(proxy);

app.listen(3000);