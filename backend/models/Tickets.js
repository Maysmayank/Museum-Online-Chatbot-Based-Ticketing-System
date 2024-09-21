const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  event: {
    type: String,  // Name of the museum or event
    required: true,
  },
  date: {
    type: Date,  // Date of the event or ticket validity
    required: true,
  },
  tickets: {
    child: {
      price: {
        type: Number,  // Price for child ticket
        required: true,
      },
      available: {
        type: Number,  // Number of child tickets available
        required: true,
        min: [0, "Available tickets cannot be less than 0"],
      },
    },
    adult: {
      price: {
        type: Number,  // Price for adult ticket
        required: true,
      },
      available: {
        type: Number,  // Number of adult tickets available
        required: true,
        min: [0, "Available tickets cannot be less than 0"],
      },
    },
    senior: {
      price: {
        type: Number,  // Price for senior citizen ticket
        required: true,
      },
      available: {
        type: Number,  // Number of senior tickets available
        required: true,
        min: [0, "Available tickets cannot be less than 0"],
      },
    },
  },
  bookedBy: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      ticketsBooked: {
        child: {
          type: Number, // Number of child tickets booked by the user
          default: 0,
        },
        adult: {
          type: Number, // Number of adult tickets booked by the user
          default: 0,
        },
        senior: {
          type: Number, // Number of senior tickets booked by the user
          default: 0,
        },
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
