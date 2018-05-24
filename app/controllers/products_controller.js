import _ from 'lodash';
import Product from '../models/product';

var _product_params = function(params) {
  return _.pick(params, ['name', 'price']);
}

class ProductsController {
  index() {
    return Product.getProducts();
  }

  show(id) {
    return Product.getProduct(id);
  }

  create(params) {
    return Product.createProduct(_product_params(params));
  }

  update(id, params) {
    return Product.updateProduct(id, _product_params(params));
  }

  destroy(id) {
    return Product.deleteProduct(id);
  }
}

export default new ProductsController
