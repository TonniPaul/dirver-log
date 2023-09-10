const Vehicle = require('../models/Vehicle');
const asyncHandler = require('express-async-handler');

const getVehicles = asyncHandler(async (req, res) => {
  await Vehicle.find()
    .then((vehicles) => {
      res.json(vehicles);
    })
    .catch((err) => {
      res.status(404);
      throw new Error('Vehicles not found');
    });
});

const getVehicle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      res.status(404).json({ error: 'No vehicle found' });
    } else {
      res.json(vehicle);
    }
  } catch (err) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

const createVehicle = asyncHandler(async (req, res) => {
  try {
    const { registrationNumber, make, model, licensePlate } = req.body;
    const vehicle = new Vehicle({
      make,
      model,
      licensePlate,
    });
    const createdVehicle = await vehicle.save();
    res.status(201).json(createdVehicle);
  } catch (err) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

const updateVehicle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { make, model, licensePlate } = req.body;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ error: 'No vehicle found' });
    }
    vehicle.make = make || vehicle.make;
    vehicle.model = model || vehicle.model;
    vehicle.licensePlate = licensePlate || vehicle.licensePlate;
    const updatedVehicle = await vehicle.save();
    res.json({
      _id: updatedVehicle._id,
      make: updatedVehicle.make,
      model: updatedVehicle.model,
      licensePlate: updatedVehicle.licensePlate,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

const deleteVehicle = asyncHandler(async (req, res) => {
  await Vehicle.findByIdAndRemove(req.params.id)
    .then((vehicle) => {
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json({ msg: 'Vehicle deleted successfully' });
    })
    .catch((err) => {
      res.status(400);
      throw new Error('Could not delete vehicle');
    });
});

module.exports = {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
