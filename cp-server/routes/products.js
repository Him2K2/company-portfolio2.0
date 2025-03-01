var express = require('express');
const ProductsService = require('../services/product');
var router = express.Router();


router.get('/', async function(req, res, next) {
  productService = new ProductsService();
  let productData = await productService.getByAllWithImg();
  res.jsonp(productData);
});

module.exports = router;
