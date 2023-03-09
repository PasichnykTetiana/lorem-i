const weService = require("../service/we-service");

class WeController {
  async getWe(req, res, next) {
    try {
      const we = await weService.getWe();
      return res.json(we);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new WeController();
