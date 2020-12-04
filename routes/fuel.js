var express = require('express');
const Fueling = require('../models/Fueling');
var router = express.Router();
var debug = require('debug')('mycar-api:routes');

/* GET home page. */
router.get('/', async (req, res) => {
    const fuelings = await Fueling.find({}).exec()
    res.json(fuelings)
});

router.get('/:id/', async (req, res) => {
    const data = await Fueling.findById(req.params.id).exec()
    res.json(data)
});

router.post('/', async (req, res) => {
    const data = req.body
    data.date = new Date()
    const saved = await new Fueling(data).save()
    res.json(saved)
});

module.exports = router;
