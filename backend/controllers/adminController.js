const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const createJWT = require('../utils/auth');

// Description: Controller for admin user
const getAdmin = asyncHandler(async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    if (!admin) {
      return res.status(404).throw(new Error('Admin user not found'));
    }
    res.json(admin);
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

const getAdminProfile = asyncHandler(async (req, res) => {
  try {
    const admin = ({ _id, email } = await Admin.findById(req.user.id));
    if (!admin) {
      return res.status(404).throw(new Error('Admin user not found'));
    }
    res.json(admin);
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

const getAdmins = asyncHandler(async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json(admins);
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

const createAdmin = asyncHandler(async (req, res) => {
  let { name, email, contactNo, password } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ name: 'required' });
  }
  if (!email) {
    errors.push({ email: 'required' });
  }
  if (!contactNo) {
    errors.push({ contactNo: 'required' });
  }
  if (!password) {
    errors.push({ password: 'required' });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  try {
    const existingAdmin = await Admin.findOne({ email: email});
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin user with this email already exists' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const admin = new Admin({
        name: name,
        email: email,
        contactNo: contactNo,
        password: hash,
      });
      const createdAdmin = await admin.save();
      const token = createJWT(res, admin.email, admin._id, admin.role);
      res.status(201).json({
        _id: createdAdmin._id,
        name: createdAdmin.name,
        email: createdAdmin.email,
        contactNo: createdAdmin.contactNo,
        role: createdAdmin.role,
        token: token,
        message: 'Admin created successfully'
      },
      );
    }
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

const updateAdmin = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      businessRegNo,
      Address,
    } = req.body;

    // Find the admin user by ID
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).throw(new Error('Admin user not found'));
    }

    // Update the admin user properties
    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.contactNo = contactNo || admin.contactNo;
    admin.businessRegNo = businessRegNo || admin.businessRegNo;
    admin.Address = Address || admin.Address;
    admin.password = await bcrypt.hash(password, 10);

    // Save the updated admin user to the database
    await admin.save();

    res.json({ message: 'Admin user updated successfully' });
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

const deleteAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndRemove(req.params.id)
    .then((admin) => {
      if (!admin) {
        return res.status(404).throw(new Error('Admin user not found'));
      }
      res.json({ message: 'Admin user deleted successfully' });
    })
    .catch((err) => {
      res.status(400);
      throw new Error('Internal server error');
    });
});

module.exports = {
  getAdminProfile,
  getAdmin,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
