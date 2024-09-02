const db = require('../../_helpers/db');

module.exports = {
    getCarService,
    postCarService,
    getCarByIdService,
    updateCarService,
    deleteCarService,
    getCarByUserIdService
};

async function getCarService(req, res) {
    try {
        const cars = await db.Car.findAll();
        res.status(200).send(cars);
    } catch (error) {
        res.status(500).json('Error retrieving cars');
    }
}

async function postCarService(req, res) {
    const { make, model, year, price, description, registrationNumber, registrationDate, images, userID } = req.body;
    try {
        const newCar = await db.Car.create({
            make,
            model,
            year,
            price,
            description,
            registrationNumber,
            registrationDate,
            images,
            userID
        });
        res.status(200).json("Car posted successfully");
    } catch (error) {
        res.status(500).json('Error creating car');
    }
}

async function getCarByIdService(req, res) {
    const { id } = req.params;
    try {
        const car = await db.Car.findByPk(id);
        if (!car) {
            return res.status(404).json("Car not found");
        }
        res.status(200).send(car);
    } catch (error) {
        res.status(500).json('Error retrieving car');
    }
}

async function updateCarService(req, res) {
    const { id } = req.params;
    const { make, model, year, price, description, registrationNumber, registrationDate, images, userID } = req.body;
    try {
        const car = await db.Car.findByPk(id);
        if (!car) {
            return res.status(404).json("Car not found");
        }
        
        await car.update({
            make,
            model,
            year,
            price,
            description,
            registrationNumber,
            registrationDate,
            images,
            userID
        });
        res.status(200).json("Car updated successfully");
    } catch (error) {
        res.status(500).json('Error updating car');
    }
}

async function deleteCarService(req, res) {
    const { id } = req.params;
    try {
        const car = await db.Car.findByPk(id);
        if (!car) {
            return res.status(404).json("Car not found");
        }
        
        await car.destroy();
        res.status(200).json("Car deleted successfully");
    } catch (error) {
        res.status(500).json('Error deleting car');
    }
}

async function getCarByUserIdService(req, res) {
    const { userId } = req.params;
    try {
        const cars = await db.Car.findAll({ where: { userID: userId } });
        res.status(200).send(cars);
    } catch (error) {
        res.status(500).json('Error retrieving cars for user');
    }
}
