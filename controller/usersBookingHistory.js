const userBookingHistoryService = require('../service/userBookingHistory');

exports.getUserBookingHistory = async (req, res, next) => {
    const {
        user: { email }
    } = req;
    try {
        const result = await userBookingHistoryService.aggregate(email);
        res.status(200).json({
            status: 'success',
            results: result.length,
            train: result,
        });
    } catch (error) {
        next(error);
    }
};