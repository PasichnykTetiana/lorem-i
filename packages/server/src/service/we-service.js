const WeModel = require("../models/we-model");

class WeService {
  async getWe() {
    const we = await WeModel.find();
    return we;
  }
}

module.exports = new WeService();
