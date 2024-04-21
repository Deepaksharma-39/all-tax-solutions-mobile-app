const express = require('express');
const router = express.Router();
const authorize = require('../../_middleware/authorize')
const userService = require('./user.service');

// routes
router.post('/login', authenticate);
router.post('/register', register);
router.get('/', authorize(['admin']), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(['admin']), getById);
router.put('/:id', authorize(['admin']), update);
router.delete('/:id', authorize(['admin']), _delete);

module.exports = router;


function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}



async function register(req, res, next) {
    const { fullname, email, mobile, password, role } = req.body;

    userService.create({ fullname, email, mobile, password, role })
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}


function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}



function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}