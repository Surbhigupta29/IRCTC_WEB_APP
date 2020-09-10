const Users = require('../models/user');

class UsersService {
  async createUser(data) {
    return Users.create(data);
  }

  async getUsers(filter) {
    console.log(filter);
    const result = await Users.find(filter);
    return result;
  }
}

module.exports = new UsersService();
