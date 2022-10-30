const Owner = require("../Model/owner");
const asyncHandler = require("express-async-handler");
const generateToken = require("../Utils/generateToken");

// registration of station owner
const signUpOwner = asyncHandler(async (req, res) => {
  const { ownername, username, ownerpassword, contactnumber } = req.body;

  const ownerAlreadyExists = await Owner.findOne({ username });

  if (ownerAlreadyExists) {
    res.status(400);
    throw new Error("Error! Owner Already Exists!");
  }

  const owner = await Owner.create({
    ownername,
    username,
    ownerpassword,
    contactnumber,
  });

  if (owner) {
    res.status(201).json({
      success: true,
      _id: owner._id,
      ownername: owner.ownername,
      username: owner.username,
      contactnumber: owner.contactnumber,
      isAdmin: owner.isAdmin,
      token: generateToken(owner._id),
    });
  } else {
    res.status(400);
    throw new Error("Error...Something Worng! ");
  }
});

// login of the station owner
const authOwner = asyncHandler(async (req, res) => {
  const { username, ownerpassword } = req.body;

  const owner = await Owner.findOne({ username });

  if (owner && (await owner.matchThePasswords(ownerpassword))) {
    res.json({
      success: true,
      _id: owner._id,
      username: owner.username,
      ownername: owner.ownername,
      contactnumber: owner.contactnumber,
      isAdmin: owner.isAdmin,
      token: generateToken(owner._id),
    });
  } else {
    res.status(400);
    throw new Error("Error...Invalid Email or Password! ");
  }
});

// get owners list
const getOwners = asyncHandler(async (req, res) => {
  const owners = await Owner.find();
  res.json(owners);
});

// get single owner
const getOwnerById = asyncHandler(async (req, res) => {
  const owner = await Owner.findById(req.params.id);

  if (owner) {
    res.json(owner);
  } else {
    res.status(404).json({ message: "Owner not found" });
  }
});

//update owner
const updateOwner = asyncHandler(async (req, res) => {
  const { ownername, username, contactnumber } = req.body;

  const owner = await Owner.findById(req.owner._id);

  if (owner) {
    owner.ownername = req.body.ownername || owner.ownername;
    owner.username = req.body.username || owner.username;
    owner.contactnumber = req.body.contactnumber || owner.contactnumber;

    if (req.body.userpassword) {
      owner.userpassword = req.body.userpassword;
    }

    const updateOwner = await owner.save();

    res.json({
      success: true,
      _id: updateOwner._id,
      ownername: updateOwner.ownername,
      username: updateOwner.username,
      contactnumber: updateOwner.contactnumber,
      isAdmin: updateOwner.isAdmin,
      token: generateToken(updateOwner._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found...");
  }
});

module.exports = {
  signUpOwner,
  authOwner,
  getOwners,
  getOwnerById,
  updateOwner,
};
