const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ownerSchema = mongoose.Schema(
  {
    ownername: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    ownerpassword: {
      type: String,
      required: true,
    },

    contactnumber: {
      type: String,
      required: true,
    },

    isAdmin: {
      //can use according to the requirements
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

ownerSchema.pre("save", async function (next) {
  if (!this.isModified("ownerpassword")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.ownerpassword = await bcrypt.hash(this.ownerpassword, salt);
});

ownerSchema.methods.matchThePasswords = async function (enteredUserPassword) {
  return await bcrypt.compare(enteredUserPassword, this.ownerpassword);
};

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
