var express = require('express');
const PortfolioService = require('../services/portfolios');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let portfolioId = req.query.id;
  let portfolioService = new PortfolioService();
  let portfolioData = await portfolioService.getById(portfolioId);
  res.jsonp(portfolioData);
});

module.exports = router;
