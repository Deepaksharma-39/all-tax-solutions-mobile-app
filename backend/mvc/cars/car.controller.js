const express = require('express');
const router = express.Router();
const authorize = require('../../_middleware/authorize');
const CarService = require('./car.service');

// Routes
router.get('/', getAll);
router.post('/', authorize(['admin', 'user']), create);
router.get('/:id', getById);
router.put('/:id', authorize(['admin']), update);
router.delete('/:id', authorize(['admin']), _delete);
router.get('/user/:userId', authorize(['admin', 'user']), getByUserId);

async function getAll(req, res, next) {
    CarService.getCarService(req, res);
}

async function create(req, res, next) {
    CarService.postCarService(req, res);
}

async function getById(req, res, next) {
    CarService.getCarByIdService(req, res);
}

async function update(req, res, next) {
    CarService.updateCarService(req, res);
}

async function _delete(req, res, next) {
    CarService.deleteCarService(req, res);
}

async function getByUserId(req, res, next) {
    CarService.getCarByUserIdService(req, res);
}

module.exports = router;
