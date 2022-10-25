const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const FuelArrival = require("../Model/fuelArrival");

const getFuelArrival = asyncHandler(async (req, res) => {
  const fuelArrivals = await FuelArrival.find({ owner: req.owner._id });
  res.json(fuelArrivals);
});

const createFuelArrival = asyncHandler(async (req, res) => {
  const { diesalArrivalTime, petrolArrivalTime } = req.body;

  if (!diesalArrivalTime || !petrolArrivalTime) {
    res.status(400);
    throw new Error("Cannot be empty fields");
  } else {
    const fuelArrival = new FuelArrival({
      owner: req.owner._id,
      diesalArrivalTime,
      petrolArrivalTime
    });

    const createdFuelArrival = await fuelArrival.save();

    res.status(201).json(createdFuelArrival);
  }
});

const updateFuelArrival = asyncHandler(async (req, res) => {
  const { diesalArrivalTime, petrolArrivalTime } = req.body;

  const fuelArrival = await FuelArrival.findById(req.params.id);

  if (fuelArrival.owner.toString() !== req.owner._id.toString()) {
    res.status(401);
    throw new Error("Cannot perform this action");
  }

  if (fuelArrival) {
    (fuelArrival.diesalArrivalTime = diesalArrivalTime),
      (fuelArrival.petrolArrivalTime = petrolArrivalTime);

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
