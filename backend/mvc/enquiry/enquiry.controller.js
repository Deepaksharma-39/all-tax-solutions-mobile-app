const express = require('express');
const router = express.Router();
const authorize = require('../../_middleware/authorize');
const enquiryService = require('./enquiry.service');


// Routes
router.get('/', authorize(['admin']), getAll);
router.get('/:id', authorize(['admin']), getById);
router.post('/', create);
router.put('/:id', authorize(['admin']), update);
router.delete('/:id', authorize(['admin']), _delete);
router.get('/user/:userId', authorize(['admin','user']), getByUserId);

module.exports = router;

// Controller Functions

async function getAll(req, res, next) {
    enquiryService.getAll()
        .then(enquiries => res.json(enquiries))
        .catch(next);
}

async function getById(req, res, next) {
    enquiryService.getById(req.params.id)
        .then(enquiry => res.json(enquiry))
        .catch(next);
}

async function create(req, res, next) {
    const { state, vehicleNumber, seatingCapacity, borderEntry, taxMode, fromDate, toDate, userId, amount } = req.body;

    enquiryService.create({ state, vehicleNumber, seatingCapacity, borderEntry, taxMode, fromDate, toDate, userId, amount })
        .then(() => res.json({ message: 'Enquiry created successfully' }))
        .catch(next);
}

async function update(req, res, next) {
    enquiryService.update(req.params.id, req.body)
        .then(enquiry => res.json(enquiry))
        .catch(next);
}

async function _delete(req, res, next) {
    enquiryService.delete(req.params.id)
        .then(() => res.json({ message: 'Enquiry deleted successfully' }))
        .catch(next);
}

async function getByUserId(req, res, next) {
    enquiryService.getByUserId(req.params.userId)
        .then(enquiries => res.json(enquiries))
        .catch(next);
}