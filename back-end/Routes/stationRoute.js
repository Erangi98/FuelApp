const express = require("express");
const {
  createStation,
  updateFuelDetails,
  getStations,
  getStationsByOwner,
} = require("../Controller/stationController");
const { protect } = require("../MiddleWares/authMiddleWare");

const router = express.Router();

//station routes
router.route("/stationsList").get(getStations);
router.route("/:id").get(protect, getStationsByOwner);
router.route("/createstation").post(protect, createStation);
router.route("/:id").patch(protect, updateFuelDetails);

module.exports = router;
