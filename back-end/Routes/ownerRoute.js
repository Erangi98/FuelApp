const express = require("express");
const {
  signUpOwner,
  authOwner,
  updateOwnerProfile,
} = require("../Controller/ownerController");
const { protect } = require("../Middlewares/authMiddleWare");

const router = express.Router();

router.route("/").post(signUpOwner);
router.route("/signIn").post(authOwner);
router.route("/profile").post(protect, updateOwnerProfile);

module.exports = router;
