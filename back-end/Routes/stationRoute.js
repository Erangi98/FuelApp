const express = require("express");
const {
    createStation,
    updateFuelDetails,
} = require("../Controller/stationController");
const { protect } = require("../MiddleWares/authMiddleWare");

const router = express.Router();

//station routes
// router.route("/stations").get(getStations);
// router.route("/").get(protect, getStationsbyOwner);
router.route("/createstation").post(protect, createStation);
 router
   .route("/:id")
   .patch(protect, updateFuelDetails)
//   .delete(protect, deleteStation);

module.exports = router;
 