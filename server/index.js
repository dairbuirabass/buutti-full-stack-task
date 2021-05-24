'use strict';
const express = require("express");
const cors = require('cors');
const path = require('path');
const config = require('./config');
const bookRoutes = require('./routes/book-routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', bookRoutes.routes);

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(config.port, () => {
  console.log("Server started on port " + config.port);
});