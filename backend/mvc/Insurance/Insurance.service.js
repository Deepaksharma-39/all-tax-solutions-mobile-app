const db = require('../../_helpers/db');

module.exports = {
    getAll,
    create,
    delete: _delete,
    getByUserId
};

// Get all insurance records
async function getAll(req, res) {
    const insurances = await db.Insurance.findAll();
    res.json(insurances);
}

// Create a new insurance record
async function create(req, res) {
    const { Name, InsurerName, Phone, userId } = req.body;

    if (!userId) {
        return res.status(400).send({ message: 'User ID is required' });
    }

    await db.Insurance.create({ Name, InsurerName, Phone, userId });
    res.status(201).send({ message: 'Insurance record created successfully' });
}

// Delete an insurance record by ID
async function _delete(req, res) {
    const insurance = await db.Insurance.findByPk(req.params.id);

    if (!insurance) {
        return res.status(404).send({ message: 'Insurance record not found' });
    }

    await insurance.destroy();
    res.status(204).send(); // No content
}

// Get insurance records by user ID
async function getByUserId(req, res) {
    const userId = req.params.userId;
    const insurances = await db.Insurance.findAll({ where: { userId } });

    if (!insurances.length) {
        return res.status(404).send({ message: 'No insurance records found for this user' });
    }

    res.json(insurances);
}
