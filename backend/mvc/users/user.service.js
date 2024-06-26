const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ mobile, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { mobile } });

    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '1d' });
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await db.User.findAll({ attributes: { exclude: ['hash'] } }); // Exclude hash by default
}

async function getById(id) {
    const user = await getUser(id);
    return user;
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { mobile: params.mobile } })) {
        throw 'mobile "' + params.mobile + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.User.create(params);
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const mobileChanged = params.mobile && user.mobile !== params.mobile;
    if (mobileChanged && await db.User.findOne({ where: { mobile: params.mobile } })) {
        throw 'mobile "' + params.mobile + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '1d' });
    return { ...omitHash(user.get()), token };
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}
