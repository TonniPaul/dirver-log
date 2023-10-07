const bcrypt = require('bcrypt');
const Driver = require('../models/Driver');
const asyncHandler = require('express-async-handler');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const getDriver = asyncHandler(async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id)
        .populate('admin');
        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }
        res.json(driver);
    } catch (error) {
        res.status(500);
        throw new Error('Internal server error');
    }
});

const getDrivers = asyncHandler(async (req, res) => {
    let query = {};
    query.admin = req.user.id;
    try {
        const drivers = await Driver.find(query).select('-password')
        .populate('admin');
        res.json({
            drivers,
            count: drivers.length
        });
    } catch (error) {
    res.status(404);
    throw new Error('Drivers not found');
    }
});

const getDriverProfile = asyncHandler(async (req, res) => {
    try {
        const driver = {
            _id,
            firstName,
            lastName,
            licenseNumber,
            nationalId,
            contactNumber,
            email,
            homeAddress,
            licenseExpiryDate
        } = await Driver.findById(req.user.id);

        if (!driver) {
          res.status(404);
          throw new Error('Driver not found');
        }
        res.json(driver);
      } catch (error) {
        throw new Error('Internal server error');
      }
    });

const createDriver = asyncHandler(async (req, res) => {
    let {
        firstName,
        lastName,
        licenseNumber,
        nationalId,
        contactNumber,
        email,
        homeAddress,
        licenseExpiryDate,
        password,
    } = req.body;
    let errors = [];
    if (!firstName) {
        errors.push({ firstName: "required" });
    }
    if (!lastName) {
        errors.push({ lastName: "required" });
    }
    if (!licenseNumber) {
        errors.push({ licenseNumber: "required" });
    }
    if (!nationalId) {
        errors.push({ nationalId: "required" });
    }
    if (!contactNumber) {
        errors.push({ contactNumber: "required" });
    }
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid" });
    }
    if (!homeAddress) {
        errors.push({ homeAddress: "required" });
    }
    if (!licenseExpiryDate) {
        errors.push({ licenseExpiryDate: "required" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }
    
    const existingDriver = await Driver.findOne({ email: email });
        if (existingDriver) {
            res.status(400);
            throw new Error('Email already exists');
        }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const driver = new Driver({
            firstName,
            lastName,
            licenseNumber,
            nationalId,
            contactNumber,
            email,
            homeAddress,
            licenseExpiryDate,
            password: hash,
            admin: req.user.id
            });
            await driver.save();
            res.status(200).json({ message: 'Driver created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500);
        throw new Error('Internal server error');
    }
});    

const updateDriver = asyncHandler(async (req, res) => {
    const driver = await Driver.findById(req.params.id || req.user._id);
    
    if (driver) {
      driver.firstName = req.body.firstName || driver.firstName;
      driver.lastName = req.body.lastName || driver.lastName;
      driver.licenseNumber = req.body.licenseNumber || driver.licenseNumber;
      driver.nationalId = req.body.nationalId || driver.nationalId;
      driver.contactNumber = req.body.contactNumber || driver.contactNumber;
      driver.email = req.body.email || driver.email;
      driver.homeAddress = req.body.homeAddress || driver.homeAddress;
      driver.licenseExpiryDate = req.body.licenseExpiryDate || driver.licenseExpiryDate;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        driver.password = hash;
      }
  
      const updatedDriver = await driver.save();
  
      res.json({
        _id: updatedDriver._id,
        firstName: updatedDriver.firstName,
        lastName: updatedDriver.lastName,
        licenseNumber: updatedDriver.licenseNumber,
        nationalId: updatedDriver.nationalId,
        contactNumber: updatedDriver.contactNumber,
        email: updatedDriver.email,
        homeAddress: updatedDriver.homeAddress,
        licenseExpiryDate: updatedDriver.licenseExpiryDate
      });
    } else {
      res.status(404);
      throw new Error('Driver not found');
    }
  });

const deleteDriver = asyncHandler(async (req, res) => {
    await Driver.findByIdAndRemove(req.params.id)
        .then(driver => {
            if (!driver) {
              return res.status(404).throw(new Error('Driver user not found'));
            }
            res.json({ message: 'Driver user deleted successfully' });
        })
        .catch(err => {
            res.status(400);
            throw new Error('Internal server error');
        });
});


module.exports = {
    getDriverProfile,
    getDriver,
    getDrivers,
    createDriver,
    updateDriver,
    deleteDriver
};