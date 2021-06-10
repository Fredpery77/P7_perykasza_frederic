const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');  
const path = require('path');
const helemt = require('helmet');


require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const postRoutes = require('../routes/post');
const userRoutes = require('../routes/user');
const likeRoutes = require('../routes/like');

const app = express();

// app.use('/posts', express.static(path.join(__dirname, 'images')));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(helmet());

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = require("../models/index");
db.sequelize.sync();

app.use('/api/v1', api);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/likes', likeRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
