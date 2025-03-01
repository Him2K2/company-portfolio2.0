const DataManager = require("../data-manager");

class UsersService {
  constructor() {}

  static async getAll() {
    const allData = DataManager.allData;
    const users = allData.users
    return users;
  }
}

module.exports = UsersService;
