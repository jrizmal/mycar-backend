var express = require('express');
const Fueling = require('../models/Fueling');
var router = express.Router();
var debug = require('debug')('mycar-api:routes');

/* GET home page. */
router.get('/', async function(req, res, next) { 
  res.json({message:'Hello'})
});

/* Other routes */
const fuelRouter = require('./fuel')
router.use('/fuel/',fuelRouter)

module.exports = router;
