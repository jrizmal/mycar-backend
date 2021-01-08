var express = require('express');
const { User } = require('../models/user');
var router = express.Router();
var debug = require('debug')('mycar-api:routes');

/* GET home page. */
router.get('/', async function(req, res, next) { 
  res.json({message:'Hello'})
});

router.get('/ping/', async function(req, res, next) { 
  res.json({message:`Hello ${req.user.email}`})
});

router.post('/settoken/', async function(req, res, next) {
  const fcm_token = req.body.token
  if(!fcm_token){
    res.status(400).json({message: "No token provided."})
    return
  }
  let dbuser = await User.findOne({fbid: req.user.uid}).exec()
  dbuser.notifications = true
  dbuser.fcm_id = fcm_token
  const saved = await dbuser.save()
  res.json(saved)
});

router.post('/unsettoken/', async function(req, res, next) {
  let dbuser = await User.findOne({fbid: req.user.uid}).exec()
  dbuser.notifications = false
  dbuser.fcm_id = null
  const saved = await dbuser.save()
  res.json(saved)
});

router.get('/getuser/', async function(req, res, next) { 
  const dbuser = await User.findOne({fbid: req.user.uid}).exec()
  res.json(dbuser)

});

/* Other routes */
const commonRouter = require('./common')
router.use('/common/',commonRouter)

module.exports = router;
