const WeModel = require("../models/we-model");

class WeService {
  async getWe() {
    const we = await WeModel.find();
    console.log(we);
    return we;
  }
}

module.exports = new WeService();
