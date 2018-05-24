import _ from 'lodash';

let products = [
  {id: 1, name: 'Coffee Mug',    price: 5.0},
  {id: 2, name: 'Bottle', price: 10.0},
  {id: 3, name: 'Mobile', price: 250.0},
  {id: 4, name: 'Laptop', price: 1000.0},
]

var getNextId = function(collection) {
  if(!collection.length) {
    return 1;
  }
  return(Math.max(...collection.map((c) => c.id)) + 1);
}

var findProduct = function(id) {
  return _.find(products, (u) => { return u.id === id });
}

class Product {
  getProducts() {
    return products;
  }

  getProduct(id) {
    return findProduct(id)
  }

  createProduct(params) {
    var newProduct = {
      id: getNextId(products),
      ...params
    };
    products.push(newProduct);
    return newProduct;
  }

  updateProduct(id, params) {
    var product = findProduct(id)
    _.each(params, (val, key) => { product[key] = val })
    return product;
  }

  deleteProduct(id) {
    var product = findProduct(id)
    _.remove(products, (u) => { return u.id === product.id });
    return product
  }
}

export default new Product
