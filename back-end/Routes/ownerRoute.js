const express = require("express");
const {
  signUpOwner,
  authOwner,
  updateOwnerProfile,
} = require("../Controller/ownerController");
const { protect } = require("../Middlewares/authMiddleWare");

const router = express.Router();

router.route("/register").post(signUpOwner);
router.route("/login").post(authOwner);
router.route("/profile").put(protect, updateOwnerProfile);

module.exports = router;
