'use strict';
const express = require("express");
const cors = require('cors');
const path = require('path');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json({ test: 'test' }));

app.listen(config.port, () => {
  console.log("Server started on port " + config.port);
});