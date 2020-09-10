const mongoose = require('mongoose');

const usersBookingHistorySchema = mongoose.Schema({
  userEmail: { type: String, required: true },
  trainClass: { type: String, enum: ['SL', 'AC1', 'Ac2'], required: true },
  passengerInformation: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      gender: { type: String, required: true },
      ticketPrice: { type: Number, required: true },
      travelDate: { type: Date, requied: true },
      status: { type: String, enum: ['onGoing', 'notStarted', 'cancelled'], default: 'notStarted' }
    }
  ],
  train: {
    type: mongoose.Schema.ObjectId,
    ref: 'train',
    default: null,
  }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const UserBookingHistory = mongoose.model('UserBookingHistory', usersBookingHistorySchema);

module.exports = UserBookingHistory;