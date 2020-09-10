const Trains = require('../models/train');

class TrainsService {
  async createTrain(data) {
    return Trains.create(data);
  }

  async getTrains(filter) {
    const result = await Trains.find(filter);
    return result;
  }

  async updateTrainWithId(trainId, data) {
    const train = await Trains.findOneAndUpdate({ _id: trainId }, data, { new: true });
    if (!train) {
      return "Train doesn't exist!";
    }
    return train;
  }

  async delete(trainId) {
    return Trains.findOneAndDelete({ _id: trainId });
  }

}

module.exports = new TrainsService();
