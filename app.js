const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
app.use( express.json() );       // to support JSON-encoded bodies

const limitCheck = require('./limitChecker');
const proxy = require('./proxy');

app.use(limitCheck);
app.use(proxy);
app.use('/api' , router);

app.listen(3000);