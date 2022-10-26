const User = require("../Model/user");
const asyncHandler = require("express-async-handler");
const generateToken = require("../Utils/generateToken");

//fuel user registration
const signUpUser = asyncHandler(async (req, res) => {
  const { fullname, username, useremail, userpassword, vehicleType } = req.body;

  const userEmailAlreadyExists = await User.findOne({ useremail });
  const usernameAlreadyExists = await User.findOne({ username });

  if (usernameAlreadyExists) {
    res.status(400);
    throw new Error("This username is not available");
  }
  if (userEmailAlreadyExists) {
    res.status(400);
    throw new Error("This email is not available");
  }

  const user = await User.create({
    fullname,
    username,
    useremail,
    userpassword,
    vehicleType
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      useremail: user.useremail,
      vehicleType: user.vehicleType,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error...Something Worng! ");
  }
});

//login of the fuel user
const authUser = asyncHandler(async (req, res) => {
  const { username, userpassword } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchThePasswords(userpassword))) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      useremail: user.useremail,
      vehicleType: user.vehicleType,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error...Invalid Email or Password! ");
  }
});

// fuel users list
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//getting individual user details
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

//updateting fuel user
const updateUser = asyncHandler(async (req, res) => {
  const { fullname, username, vehicleType } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.fullname = req.body.fullname || user.fullname;
    user.username = req.body.username || user.username;
    user.vehicleType = req.body.vehicleType || user.vehicleType;

    if (req.body.userpassword) {
      user.userpassword = req.body.userpassword;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      fullname: updateUser.fullname,
      username: updateUser.username,
      vehicleType: updateUser.vehicleType,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found...");
  }
});

//exporting the methods
module.exports = { signUpUser, authUser, getUsers, getUserById, updateUser };
