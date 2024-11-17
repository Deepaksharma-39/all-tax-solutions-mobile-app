const express = require('express');
const router = express.Router();
const authorize = require('../../_middleware/authorize');
const insuranceService = require('./Insurance.service');

// Routes
router.get('/', getAll);
router.post('/', authorize(['admin', 'user']), postInsurance);
router.delete('/:id', authorize(['admin']), deleteInsurance);
router.get('/user/:userId', authorize(['admin', 'user']), getByUserId);

// Controller functions

async function getAll(req, res, next) {
    try {
        await insuranceService.getAll(req, res);
    } catch (err) {
        next(err);
    }
}

async function postInsurance(req, res, next) {
    try {
        await insuranceService.create(req, res);
    } catch (err) {
        next(err);
    }
}

async function deleteInsurance(req, res, next) {
    try {
        await insuranceService.delete(req, res);
    } catch (err) {
        next(err);
    }
}

async function getByUserId(req, res, next) {
    try {
        await insuranceService.getByUserId(req, res);
    } catch (err) {
        next(err);
    }
}

module.exports = router;
