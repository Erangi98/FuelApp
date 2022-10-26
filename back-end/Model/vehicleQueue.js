const mongoose = require("mongoose");

const queueSchema = mongoose.Schema(
  {
    bikeQueueLength: {
      type: Number,
      required: false,
    },
    carQueueLength: {
      type: Number,
      required: false,
    },
    vanQueueLength: {
      type: Number,
      required: false,
    },
    busQueueLength: {
      type: Number,
      required: false,
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
  },

  {
    timestamps: true,
  }
);

const Queue = mongoose.model("Queue", queueSchema);

module.exports = Queue;
