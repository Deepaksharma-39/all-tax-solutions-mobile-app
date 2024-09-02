const express = require('express');
const router = express.Router();
const authorize = require('../../_middleware/authorize');
const JobListingService = require('./Jobs.service');

// Routes
router.get('/', getAll);
router.post('/', authorize(['admin', 'user']), create);
router.get('/:id', getById);
router.put('/:id', authorize(['admin']), update);
router.delete('/:id', authorize(['admin', 'user']), _delete);
router.get('/user/:userId', authorize(['admin', 'user']), getByUserId);

async function getAll(req, res, next) {
    JobListingService.getJobListingService(req, res);
}

async function create(req, res, next) {
    JobListingService.postJobListingService(req, res);
}

async function getById(req, res, next) {
    JobListingService.getJobListingByIdService(req, res);
}

async function update(req, res, next) {
    JobListingService.updateJobListingService(req, res);
}

async function _delete(req, res, next) {
    JobListingService.deleteJobListingService(req, res);
}

async function getByUserId(req, res, next) {
    JobListingService.getJobListingByUserIdService(req, res);
}

module.exports = router;
