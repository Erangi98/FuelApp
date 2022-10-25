const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const FuelArrival = require("../Model/fuelArrival");

global.x = false;
global.y = false;

const getFuelArrival = asyncHandler(async (req, res) => {
  const fuelArrivals = await FuelArrival.find({ owner: req.owner._id });
  res.json(fuelArrivals);
});

const createFuelArrival = asyncHandler(async (req, res) => {
  const { dieselArrivalTime, petrolArrivalTime } = req.body;

  if (petrolArrivalTime) x = true;

  if (dieselArrivalTime) y = true;

  if (dieselArrivalTime || petrolArrivalTime) {
    const fuelArrival = new FuelArrival({
      owner: req.owner._id,
      dieselArrivalTime,
      petrolArrivalTime,
      petrolStatus: x,
      dieselStatus: y,
    });

    const createdFuelArrival = await fuelArrival.save();

    res.status(201).json(createdFuelArrival);
  }
});

const updateFuelArrival = asyncHandler(async (req, res) => {
  const { dieselArrivalTime, petrolArrivalTime } = req.body;

  if (petrolArrivalTime) x = true;

  if (dieselArrivalTime) y = true;

  const fuelArrival = await FuelArrival.findById(req.params.id);

  if (fuelArrival.owner.toString() !== req.owner._id.toString()) {
    res.status(401);
    throw new Error("Cannot perform this action");
  }

  if (fuelArrival) {
    (fuelArrival.dieselArrivalTime = dieselArrivalTime,
    fuelArrival.petrolArrivalTime = petrolArrivalTime,
    fuelArrival.petrolStatus = x,
    fuelArrival.dieselStatus = y);

    const updatedFuelArrival = await fuelArrival.save();
    res.json(updatedFuelArrival);
  } else {
    res.status(404);
    throw new Error("Arrival Time not found");
  }
});

module.exports = {
  getFuelArrival,
  createFuelArrival,
  updateFuelArrival,
};
