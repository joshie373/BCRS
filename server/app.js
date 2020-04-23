/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const SecurityQuestionApi = require('./routes/security-question-api');
const UserApi = require('./routes/user-api');
const SessionApi = require('./routes/session-api');
const InvoicesApi = require('./routes/invoice-api');
const RolesApi = require('./routes/role-api');
const ServicesApi = require('./routes/service-api');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));
app.use(cors());

/**
 * Variables
 */
const port = process.env.PORT || 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://21216666:Kenneth37@buwebdev-cluster-1-z8vdl.mongodb.net/bcrs?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s)
 */

 /**
 * Security Questions APIs
 */
  app.use('/api/users', UserApi);
  app.use('/api/session', SessionApi);
  app.use('/api/security-questions', SecurityQuestionApi);
  app.use('/api/invoices', InvoicesApi);
  app.use('/api/roles', RolesApi);
  app.use('/api/services', ServicesApi);


/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
