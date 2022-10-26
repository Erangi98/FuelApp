const User = require("../Model/user");
const Queue = require("../Model/vehicleQueue");
const asyncHandler = require("express-async-handler");

let bike = 0;
let car = 0;
let van = 0;
let bus = 0;

const queueIncrease = asyncHandler(async (req, res) => {
  const { vehicleType } = req.body;

  const queue = await Queue.findById(req.params.id);

  if (queue) {
    if (vehicleType !== null) {
      if (vehicleType == "bike") {
        bike++;
      }
      if (vehicleType == "car") {
        car++;
      }
      if (vehicleType == "van") {
        van++;
      }
      if (vehicleType == "bus") {
        bus++;
      }
    }
    const lengths = await Queue({
      bikeQueueLength: bike,
      carQueueLength: car,
      vanQueueLength: van,
      busQueueLength: bus,
    });

    const savedQueue = await lengths.save();
    if (savedQueue) {
      res.json({
        bikeQueueLength: bike,
        carQueueLength: car,
        vanQueueLength: van,
        busQueueLength: bus,
      });
    }
  }
});

const enteredTime = asyncHandler(async (req, res) => {
  const { enteredTime } = req.body;

  const enter = await Queue.create(enteredTime);

  res.status(200).json(enter);
});

const exitTime = asyncHandler(async (req, res) => {
  const { exitedTime } = req.body;

  const quit = await Queue.create(exitedTime);

  res.status(200).json(quit);
});

module.exports = { queueIncrease, enteredTime, exitTime };
