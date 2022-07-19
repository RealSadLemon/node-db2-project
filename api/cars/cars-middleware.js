const carsModel = require('./cars-model');
const vinValidator = require('vin-validator');
const db = require('../../data/db-config');

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  carsModel.getById(id)
    .then(car => {
      if(car != null){
        next();
      } else {
        res.status(404).json({ message: `car with id ${id} is not found`})
        return;
      }
    })
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { body } = req;
  if(typeof body.vin !== 'string'){
    res.status(400).json({ message: 'vin is missing'});
    return;
  } else if(typeof body.make !== 'string'){
    res.status(400).json({ message: 'make is missing'})
    return;
  } else if(typeof body.model !== 'string'){
    res.status(400).json({ message: 'model is missing'})
    return;
  } else if(typeof body.mileage !== 'number'){
    res.status(400).json({ message: 'mileage is missing'})
    return;
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const vinIsValid = vinValidator.validate(req.body.vin);
  if(vinIsValid){
    next();
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid`})
    return;
  }
}

async function checkVinNumberUnique(req, res, next){
  // DO YOUR MAGIC
  db('cars').where('vin', req.body.vin).first()
    .then(matchingCar => {
      if(matchingCar != null){
        res.status(400).json({ message: `vin ${matchingCar.vin} already exists` })
      } else {
        next();
      }
    })
  // if(false){
  //   next();
  // } else {
  //   res.status(400).json({ message: `vin ${matchingVin} already exists`});
  //   return;
  // }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}