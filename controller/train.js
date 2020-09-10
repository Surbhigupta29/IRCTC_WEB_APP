const trainService = require('../service/train');

exports.getAllTrains = async (req, res, next) => {
  const {
    query: { filter }
  } = req;
  try {
    const result = await trainService.getTrains(filter);
    res.status(200).json({
      status: 'success',
      results: result.length,
      train: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.createTrain = async (req, res, next) => {
  try {
    const result = await trainService.createTrain(req.body);
    res.status(201).json({
      status: 'success',
      train: result,
    });
  } catch (error) {
    next(error);
  }
};

/// req.body.train = {} 
exports.updateTrain = async (req, res, next) => {
  const {
    params: { trainId },
    body: { train }
  } = req;
  try {
    const result = await trainService.updateTrainWithId(trainId, train);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTrain = async (req, res, next) => {
  const {
    params: { trainId }
  } = req;
  try {
    const result = await trainService.delete(trainId);
    res.status(204).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
