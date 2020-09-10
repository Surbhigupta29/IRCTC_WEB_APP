const mongoose = require('mongoose');

const trainSchema = mongoose.Schema({
    trainNo:{ type: Number, required: true},
	trainName:{ type: String, required: true },
	fromStn:{ type: String, required: true },
	fromStnCode:{ type: String, required: true },
	toStn:{ type: String, required: true },
	toStnCode:{	type: String, required: true },
	depAtFromStn:{ type: String, required: true },
	arrAtToStn:{ type: String, required: true },
	travelDate: {type: Date, required: true},
	travelTime:{ type: String, required: true },
	trainType:{ type: String, required: true },
	AC1TierPrice:{ type: Number, required: true },
	AC2TierPrice:{ type: Number, required: true },
	sleeperClassPrice:{ type: Number, required: true }
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

trainSchema.index(
  { trainNo: 1, fromStn: 1, toStn: 1},
  {unique: true});

const Trains = mongoose.model('Trains', trainSchema);

module.exports = Trains;
