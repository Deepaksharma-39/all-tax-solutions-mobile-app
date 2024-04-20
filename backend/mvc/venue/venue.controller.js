const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize');
const venueService = require('./venue.service');

// Routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authorize(['admin']), create);
router.put('/:id', authorize(['admin']), update);
router.delete('/:id', authorize(['admin']), _delete);

module.exports = router;

// Controller Functions

function getAll(req, res, next) {
    venueService.getAll()
        .then(venues => res.json(venues))
        .catch(next);
}

function getById(req, res, next) {
    venueService.getById(req.params.id)
        .then(venue => res.json(venue))
        .catch(next);
}

function create(req, res, next) {
    venueService.create(req.body)
        .then(() => res.json({ message: 'Entry created successfully' }))
        .catch(next);
}

function update(req, res, next) {
    venueService.update(req.params.id, req.body)
        .then(venue => res.json(venue))
        .catch(next);
}

function _delete(req, res, next) {
    venueService.delete(req.params.id)
        .then(() => res.json({ message: 'Entry deleted successfully' }))
        .catch(next);
}
