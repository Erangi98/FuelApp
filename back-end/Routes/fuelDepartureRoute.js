const express = require("express");
const {
  getFuelDeparture,
  createFuelDeparture,
  updateFuelDeparture,
} = require("../Controller/fuelDepartureController");
const { protect } = require("../MiddleWares/authMiddleWare");

const router = express.Router();

//fuel departure routes
router.route("/").get(protect, getFuelDeparture);
router.route("/createFuelDeparture").post(protect, createFuelDeparture);
router.route("/:id").put(protect, updateFuelDeparture);

module.exports = router;
