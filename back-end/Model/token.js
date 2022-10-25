const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "owners",
    unique: "true",
  },

  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
