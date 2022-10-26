const express = require("express");
const {
  fuelStatus,
  updateFuelArrival,
  updateFuelDeparture,
} = require("../Controller/fuelController");
const { protect } = require("../MiddleWares/authMiddleWare");

const router = express.Router();

//router.route("/:id").get(protect, getFuelArrival);
router.route("/createFuelArrival").post(protect, fuelStatus);
router
  .route("/:id")
  .put(protect, updateFuelArrival);
 

module.exports = router;
