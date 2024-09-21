const { instance } = require("../config/razorpay");
const crypto = require("crypto");

const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");



const User = require("../models/User");
const Ticket = require("../models/Tickets");

exports.capturePayment = async (req, res) => {
  const { ticketId, tickets } = req.body; // Assuming tickets is an object with child, adult, and senior counts
  const userId = req.user.id;

  if (!ticketId || !tickets) {
    return res.json({ success: false, message: "Please Provide Ticket ID and Details" });
  }

  let total_amount = 0;

  try {
    // Find the ticket details
    const ticketDetails = await Ticket.findById(ticketId);
    if (!ticketDetails) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    // Initialize discount
    let discount = 0;

    // Check if the user is a member
    const userDetails = await User.findById(userId);
    if (userDetails.membership && userDetails.membership.isMember) {
      discount = userDetails.membership.discountPoints; // Get discount points
    }

    // Calculate total amount based on ticket counts
    const { child, adult, senior } = tickets;

    // Validate ticket availability and calculate total amount
    if (child > ticketDetails.tickets.child.available || 
        adult > ticketDetails.tickets.adult.available || 
        senior > ticketDetails.tickets.senior.available) {
      return res.status(400).json({ success: false, message: "Not enough tickets available" });
    }

    total_amount += (child * ticketDetails.tickets.child.price) || 0;
    total_amount += (adult * ticketDetails.tickets.adult.price) || 0;
    total_amount += (senior * ticketDetails.tickets.senior.price) || 0;

    // Apply discount if the user is a member
    if (discount > 0) {
      total_amount -= discount; // Deduct discount from total amount
      total_amount = Math.max(total_amount, 0); // Ensure total amount does not go negative
    }

    const options = {
      amount: total_amount * 100, // Convert to paise
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
    };

    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options);
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Could not initiate payment." });
  }
};


// Verify payment after it's made by the user
exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, ticketId, bookedTickets } = req.body;
    const userId = req.user.id;
  
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !ticketId || !bookedTickets) {
      return res.status(400).json({ success: false, message: "Invalid payment data" });
    }
  
    try {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
  
      if (expectedSignature === razorpay_signature) {
        // If signature matches, update the ticket model and book the tickets
        await bookTickets(ticketId, userId, bookedTickets);
        return res.status(200).json({ success: true, message: "Payment verified and tickets booked." });
      } else {
        return res.status(400).json({ success: false, message: "Payment verification failed." });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Error in payment verification." });
    }
  };
  
  // Book tickets function to update ticket availability and booking details
  async function bookTickets(ticketId, userId, bookedTickets) {
    const ticket = await Ticket.findById(ticketId);
  
    if (!ticket) {
      throw new Error("Ticket not found");
    }
  
    // Deduct booked tickets from available tickets
    ticket.tickets.child.available -= bookedTickets.child;
    ticket.tickets.adult.available -= bookedTickets.adult;
    ticket.tickets.senior.available -= bookedTickets.senior;
  
    // Add the user to bookedBy array
    ticket.bookedBy.push({
      userId: userId,
      ticketsBooked: {
        child: bookedTickets.child,
        adult: bookedTickets.adult,
        senior: bookedTickets.senior,
      },
    });
  
    await ticket.save();
  }
 
  
  // Send Payment Success Email
  exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({ success: false, message: "Please provide all the details" });
    }
  
    try {
      const user = await User.findById(userId);
  
      await mailSender(
        user.email,
        "Payment Received - Ticket Booking",
        paymentSuccessEmail(
          `${user.firstName} ${user.lastName}`,
          amount / 100, // Convert back to the actual amount from paise
          orderId,
          paymentId
        )
      );
  
      return res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.log("Error in sending mail", error);
      return res.status(500).json({ success: false, message: "Could not send email" });
    }
  };
    