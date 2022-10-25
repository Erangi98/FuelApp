const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const FuelDeparture = require("../Model/fuelDeparture");

const getFuelDeparture = asyncHandler(async (req, res) => {
  const fuelDepartures = await FuelDeparture.find({ owner: req.owner._id });
  res.json(fuelDepartures);
});

const createFuelDeparture = asyncHandler(async (req, res) => {
  const { diesalDepartureTime, petrolDepartureTime } = req.body;

  if (petrolDepartureTime) x = false;

  if (diesalDepartureTime) y = false;

  if (diesalDepartureTime || petrolDepartureTime) {
    const fuelDeparture = new FuelDeparture({
      owner: req.owner._id,
      diesalDepartureTime,
      petrolDepartureTime,
      petrolStatus: x,
      dieselStatus: y,
    });

    const createdFuelDeparture = await fuelDeparture.save();

    res.status(201).json(createdFuelDeparture);
  }
});

const updateFuelDeparture = asyncHandler(async (req, res) => {
  const { diesalDepartureTime, petrolDepartureTime } = req.body;

  if (petrolDepartureTime) x = true;

  if (diesalDepartureTime) y = true;

  const fuelDeparture = await FuelDeparture.findById(req.params.id);

  if (fuelDeparture.owner.toString() !== req.owner._id.toString()) {
    res.status(401);
    throw new Error("Cannot perform this action");
  }

  if (fuelDeparture) {
    (fuelDeparture.diesalDepartureTime = diesalDepartureTime),
      (fuelDeparture.petrolDepartureTime = petrolDepartureTime),
      (fuelDeparture.petrolStatus = x),
      (fuelDeparture.dieselStatus = y);

    const updatedFuelDeparture = await fuelDeparture.save();
    res.json(updatedFuelDeparture);
  } else {
    res.status(404);
    throw new Error("Departure Time not found");
  }
});

module.exports = {
  getFuelDeparture,
  createFuelDeparture,
  updateFuelDeparture,
};
