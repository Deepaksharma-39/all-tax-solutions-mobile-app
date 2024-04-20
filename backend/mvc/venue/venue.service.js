const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Venue.findAll();
}

async function getById(id) {
    const venue = await getVenue(id);
    return venue;
}

async function create(params) {
    // validate if a venue with the same state already exists
    const existingVenue = await db.Venue.findOne({ where: { state: params.state } });
    if (existingVenue) {
        throw 'A Entry with the same state already exists';
    }

    // create the venue
    await db.Venue.create(params);
}

async function update(id, params) {
    const venue = await getVenue(id);

    // copy params to venue and save
    Object.assign(venue, params);
    await venue.save();

    return venue;
}

async function _delete(id) {
    const venue = await getVenue(id);
    await venue.destroy();
}

// helper function to get a venue by id
async function getVenue(id) {
    const venue = await db.Venue.findByPk(id);
    if (!venue) throw 'Venue not found';
    return venue;
}
