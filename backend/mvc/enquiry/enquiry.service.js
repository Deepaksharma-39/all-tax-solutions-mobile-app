const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getByUserId
};

async function getAll() {
    return await db.Enquiry.findAll();
}

async function getById(id) {
    const enquiry = await getEnquiry(id);
    return enquiry;
}

async function create(params) {
    // Validate if necessary
    // For example, check if the user exists before associating the enquiry

    // Create the enquiry
    await db.Enquiry.create(params);
}

async function update(id, params) {
    const enquiry = await getEnquiry(id);

    // Update the enquiry with new params
    Object.assign(enquiry, params);
    await enquiry.save();

    return enquiry;
}

async function _delete(id) {
    const enquiry = await getEnquiry(id);
    await enquiry.destroy();
}

async function getByUserId(userId) {
    // Fetch enquiries by user ID
    return await db.Enquiry.findAll({ where: { userId } });
}

// Helper function to get an enquiry by ID
async function getEnquiry(id) {
    const enquiry = await db.Enquiry.findByPk(id);
    if (!enquiry) throw 'Enquiry not found';
    return enquiry;
}
