const mongoose = require("mongoose");


const fuelArrivalSchema = mongoose.Schema(
  {
    dieselArrivalTime: {
      type: Date,
    },

    petrolArrivalTime: {
      type: Date,
    },
    petrolStatus: {
      type: Boolean
    },
    dieselStatus: {
      type: Boolean
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
