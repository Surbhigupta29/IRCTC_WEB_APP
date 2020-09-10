const mongoose = require("mongoose");
const Users = require('../models/user');
const UserBookingHistory = require("../models/usersBookingHistory");
const train = require("../models/train");
const { ObjectId } = require('mongodb');

const stringToObject = id => {
    if (typeof id === "string") {
        id = mongoose.Types.ObjectId(id);
    }
    return id;
};


class UserBookingHistoryService {

    async createUserBookingHistory(passengerInfo, trainId, trainClass, userEmail) {
        const trainData = await train.findById(trainId);
        var travel_date = trainData.travelDate;
        var today_date = new Date();
        if (!(new Date(travel_date) >= today_date))
            return "Cannot book ticket of past dates";
        var price;
        switch (trainClass) {
            case "SL":
                price = trainData.sleeperClassPrice;
                break;
            case "AC1":
                price = trainData.AC1TierPrice;
                break;
            case "AC2":
                price = trainData.AC2TierPrice;
                break;
        }
        var discount = 0.3 * price;     // discount for older age passenger
        for (var passenger of passengerInfo) {
            if (passenger.age > 45)
                price -= discount;
            passenger.ticketPrice = price;
            passenger.travelDate = travel_date;
        }

        const result = await UserBookingHistory.create({
            passengerInformation: passengerInfo,
            userEmail,
            trainClass,
            train: trainId
        });

        return result;
    }

    async getUserBookingHistory(userEmail, passengerInfoId) {
        var result = await UserBookingHistory.find({ $and: [{ "passengerInformation._id": { $eq: stringToObject(passengerInfoId) } }, { userEmail }] });
        if (result.length === 0)
            return "passengerInfo Id is wrong";
        var passenger = result[0].passengerInformation;
        var dataToUpdate = [...passenger];
        var res, passengerInformation;
        for (res of dataToUpdate) {
            if (String(res._id) === (passengerInfoId)) {
                passengerInformation = res;
            }
        }

        result = await UserBookingHistory.find({ $and: [{ "passengerInformation._id": { $eq: stringToObject(passengerInfoId) } }, { userEmail }] });
        passenger = result[0].passengerInformation;

        if (new Date(passengerInformation.travelDate) < new Date())
            return "can't cancel ticket for past dates travel";
        if (passengerInformation.status === "onGoing" || passengerInformation.status === "cancelled")
            return "this ticket cannot be cancelled because train has started or it is already canncelled";

        for (res of dataToUpdate) {
            if (String(res._id) === (passengerInfoId)) {
                res.status = "cancelled";
            }
        }
        const filter = {
            "passengerInformation": passenger,
            userEmail
        };
        dataToUpdate = { "passengerInformation": dataToUpdate };

        const doc = await UserBookingHistory.findOneAndUpdate(filter, dataToUpdate,
            {
                new: true,
                runValidators: true,
            });
        return doc;
    }

    async aggregate(mail) {
        const docs = await UserBookingHistory.aggregate([
            {
                $match: {
                    userEmail: {
                        $eq: mail
                    },
                },
            },
            {
                $unwind: "$passengerInformation"
            },
            {
                $project: {
                    _id: 0,
                    created_at: 0,
                    updated_at: 0,
                    train: 0,
                },
            },
        ]);

        return docs;
    }
}

module.exports = new UserBookingHistoryService();
