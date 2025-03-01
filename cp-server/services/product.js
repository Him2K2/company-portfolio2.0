const DataManager = require("../data-manager");

class ProductsService {
  constructor() {}

  getByAllWithImg() {
    const { products, product_img } = DataManager.allData;

    const productsData = products.map((product) => {
      const images = product_img.filter((img) => img.product_id === product.id);
      return {
        ...product,
        img: images, 
      };
    });

    return productsData;
  }
}

module.exports = ProductsService;
