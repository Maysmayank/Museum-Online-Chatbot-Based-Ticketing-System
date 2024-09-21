const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    discountPoints: {
      type: Number,
      required: true,
      default: 0, // Default discount points
    },
    token: {
      type: String,
    },
   
    image: {
      type: String,
    },
    // Adding membership status and discount system
    membership: {
      type: {
        isMember: {
          type: Boolean,
          default: false, // Non-members by default
        },
        discountPoints: {
          type: Number,
          default: 0, // Initial discount points
        },
      },
      default: { isMember: false, discountPoints: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
