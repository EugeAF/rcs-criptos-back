var express = require('express');
var router = express.Router();
const Coin = require('../models/Coin');

router.get('/', function (req, res, next) {
    Coin.find({ name: { $regex: req.query.name } }, (err, data) => {
        if (err) return console.error(err);
        res.json(data);
    })
});

router.get('/list', function (req, res, next) {
    Coin.find({}, (err, data) => {
        if (err) return console.error(err);

        res.json(data);

    })
});


router.get('/:id', function (req, res, next) {
    Coin.findOne({ _id: req.params.id }, (err, data) => {
        if (err) return console.error(err);
        res.json(data);
    })
});


router.post('/', function (req, res, next) {
    console.log("Nueva Moneda", req.body)
    const newCoin = new Coin({
        name: req.body.name,
        value: req.body.value,
        rateUSD: req.body.rateUSD,
        notas: req.body.notas
    })
    console.log(newCoin)
    newCoin.save(function (err, data) {
        if (err) return res.status(400).json({error: err.message});
        console.log('Ok!');
        console.log(data);
        res.json(data);
    });
});


router.put('/:id', function (req, res, next) {
    Coin.updateOne({ _id: req.params.id }, { name: req.body.name, value: req.body.value, rateUSD: req.body.rateUSD, notas: req.body.notas },
        (err, data) => {
            if (err) return console.error(err);
            res.json(data);
        })
});

router.put('/bitcoin/:id', function (req, res, next) {
    console.log("DIOSSSS ", req.body, req.params)
    console.log("sasssdaas ", req.body.data.priceUsd, req.params)
    Coin.updateOne({ _id: req.params.id }, { rateUSD: req.body.data.priceUsd },
        (err, data) => {
            if (err) return console.error(err);
            res.json(data);
            console.log("PRUEBA", data)
        })
});


router.delete('/:id', (req, res, next) => {
    console.log('DELATE ', req.body)
    Coin.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) return console.error(err);
        res.json(data);
    })
})




module.exports = router;