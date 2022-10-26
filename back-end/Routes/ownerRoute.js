const express = require("express");
const {
  signUpOwner,
  authOwner,
  getOwners,
  getOwnerById,
  updateOwner,
} = require("../Controller/ownerController");
const { protect } = require("../Middlewares/authMiddleWare");

const router = express.Router();

//station owner routes
router.route("/register").post(signUpOwner);
router.route("/login").post(authOwner);
router.route("/").get(getOwners);
router.route("/:id").get(getOwnerById).put(protect, updateOwner);

module.exports = router;
