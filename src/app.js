/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const config = require('config');
const logger = require('./utils/logger');
var multer = require('multer');

require('./passport');

// common controllers
const authController = require('./api/common/auth/authController');
const userController = require('./api/common/user/userController');
const settingsController = require('./api/common/settings/settingsController');
const dataController = require('./api/common/data/dataController');

const SeedService = require('./api/seedService');
const seedService = new SeedService();

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const { port, root } = config.get('api');

function logErrors(err, req, res, next) {
  logger.error(err);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something went wrong.' });
  } else {
    next(err);
  }
}
const DIR = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});

app.post('/api/upload',upload.single('photo'), function (req, res) {
  if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
  
    } else {
      console.log('file received successfully');
      return res.send({
        success: true
      })
    }
});


app.use(cors());
app.use(bodyParser.json());
app.use('/api', express.static('public'));

const auth = passport.authenticate('jwt', { session: false });

// seed data in case of empty data base
seedService.checkAndSeed();

// routes for common controllers
app.use(`${root}/auth`, authController);
app.use(`${root}/users`, auth, userController);
app.use(`${root}/settings`, auth, settingsController);
app.use(`${root}/data`, dataController);


app.use(logErrors);
app.use(clientErrorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port);

logger.info(`Server start listening port: ${port}`);
