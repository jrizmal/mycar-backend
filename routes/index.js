var express = require('express');
var router = express.Router();
var debug = require('debug')('mycar-api:routes');

/* GET home page. */
router.get('/', async function(req, res, next) { 
  res.json({message:'Hello'})
});

router.get('/ping/', async function(req, res, next) { 
  res.json({message:`Hello ${req.user.email}`})
});

/* Other routes */
const commonRouter = require('./common')
router.use('/common/',commonRouter)

module.exports = router;
