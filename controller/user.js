const userBookingHistoryService = require('../service/userBookingHistory');

exports.bookTicket = async (req, res, next) => {
    try {
        const { body: { passengerInfo, train, trainClass }, user: { email } } = req;

        const result = await userBookingHistoryService.createUserBookingHistory(passengerInfo, train, trainClass, email);
        res.status(201).json({
            status: 'success',
            train: result,
        });
    } catch (error) {
        next(error);
    }
};

exports.cancelTicket = async (req, res, next) => {
    try {
        const { user: { email }, body: { passangerInfoId } } = req;
        const result = await userBookingHistoryService.getUserBookingHistory(email, passangerInfoId);
        res.status(201).json({
            status: 'success',
            train: result,
        });
    } catch (error) {
        next(error);
    }
};

