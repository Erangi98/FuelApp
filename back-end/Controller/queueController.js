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

// const queueIncrease = asyncHandler(async(req, res) => {
//     const user = User.findById(req.params.id);

//     if (user) {
//         if ( user.vehicleType !== null){

//         if (user.vehicleType == "bike"){
//             b ++;
//         }
//         if (user.vehicleType == "tuk"){
//             t ++;
//         }
//         if (user.vehicleType == "car"){
//             c ++;
//         }
//         if (user.vehicleType == "van"){
//             v ++;
//         }
//     }
//         res.json({
//             bikeQueueLength: b,
//             tukQueueLength: t,
//             carQueueLength: c,
//             vanQueueLength: v
//         })

//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
// });

module.exports = { queueIncrease };
