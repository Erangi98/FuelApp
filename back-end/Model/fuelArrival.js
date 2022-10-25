const mongoose = require("mongoose");


const fuelArrivalSchema = mongoose.Schema(
  {
    diesalArrivalTime: {
      type: Date,
      required: true,
    },

    petrolArrivalTime: {
      type: Date,
      required: true,
    },
    owner: {
      //can use according to the requirements
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Owner",
    },
  },

  {
    timestamps: true,
  }
);

const FuelArrival= mongoose.model("FuelArrival", fuelArrivalSchema);

module.exports = FuelArrival;
