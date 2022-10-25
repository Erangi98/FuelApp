
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

    userpassword: {
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
  if (!this.isModified("userpassword")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.userpassword = await bcrypt.hash(this.userpassword, salt);
});

ownerSchema.methods.matchThePasswords = async function (enteredUserPassword) {
  return await bcrypt.compare(enteredUserPassword, this.userpassword);
};

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;

