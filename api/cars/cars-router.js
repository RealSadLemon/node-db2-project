// DO YOUR MAGIC
const express = require('express')
const router = express.Router();
const carsModel = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware');

router.get('/', (req, res) => {
    carsModel.getAll()
        .then(cars => {
            res.status(200).json(cars);
        })
})

router.get('/:id', checkCarId, (req, res, next) => {
    carsModel.getById(req.params.id)
        .then(car => {
            res.status(200).json(car)
        })
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    carsModel.create(req.body)
        .then(car => {
            res.status(201).json(car);
        })
        .catch(err => {
            next(err);
        })
})

router.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router;