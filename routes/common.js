var express = require('express');
const authenticated = require('../middleware/authenticated');
const { Fueling, Tires, Service, FirstAid } = require('../models/common');
var router = express.Router();
var debug = require('debug')('mycar-api:routes');

/* Fuel */
router.get('/fuel/', async (req, res) => {
    const fuelings = await Fueling.find({ user: req.user.uid }).exec()
    res.json(fuelings)
});

router.get('/fuel/:id/', async (req, res) => {
    const data = await Fueling.findById(req.params.id).exec()
    res.json(data)
});

router.post('/fuel/', async (req, res) => {
    const data = Object.assign({}, req.body, {
        date: new Date(),
        user: req.user.uid
    })
    const saved = await new Fueling(data).save()
    res.json(saved)
});
/* Tires */
router.get('/tires/', async (req, res) => {
    const tires = await Tires.find({ user: req.user.uid }).exec()
    res.json(tires)
});
router.post('/tires/', async (req, res) => {
    const data = Object.assign({}, req.body, {
        date: new Date(),
        user: req.user.uid
    })
    const saved = await new Tires(data).save()
    res.json(saved)
});
/* Services */
router.get('/services/', async (req, res) => {
    const services = await Service.find({ user: req.user.uid }).exec()
    res.json(services)
});
router.post('/services/', async (req, res) => {
    const data = Object.assign({}, req.body, {
        date: new Date(),
        user: req.user.uid
    })
    const saved = await new Service(data).save()
    res.json(saved)
});

/* First aid */
router.get('/firstaid/', async (req, res) => {
    const firstaids = await FirstAid.find({ user: req.user.uid }).exec()
    res.json(firstaids)
});

router.post('/firstaid/', async (req, res) => {
    const data = Object.assign({}, req.body, {
        user: req.user.uid
    })
    const saved = await new FirstAid(data).save()
    res.json(saved)
});
module.exports = router;
