const express = require("express");
const {
  fuelStatus,
  updateFuelArrival,
  updateFuelDeparture,
} = require("../Controller/fuelController");
const { protect } = require("../MiddleWares/authMiddleWare");

const router = express.Router();
 
//fuel arrival routes
router.route("/createFuelArrival").post(protect, fuelStatus);
router.route("/updatefueldeparture/:id").post(protect, updateFuelDeparture);
router.route("/:id").put(protect, updateFuelArrival);

module.exports = router;
