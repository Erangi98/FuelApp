const mongoose = require("mongoose");

const fuelDepartureSchema = mongoose.Schema(
  {
    diesalDepartureTime: {
      type: Date,
      required: true,
    },

    petrolDepartureTime: {
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

const FuelDeparture = mongoose.model("FuelDeparture", fuelDepartureSchema);

module.exports = FuelDeparture;
