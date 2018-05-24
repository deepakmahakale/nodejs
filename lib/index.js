const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const UsersController = require('../app/controllers/users_controller')
import ProductsController from '../app/controllers/products_controller';

app.listen(3000, () => console.log('Listening on port 3000!'));

//                                Middlewares

// Logger Middleware
const logger = function (req, res, next) {
  console.log(req.method + ' ' + req.url);
  console.log('Body: ');
  console.log(req.body);
  next();
}

// Auth Middleware
const authMiddleware = function(req, res, next) {
  if(req.headers && req.headers.auth) {
    next();
  } else {
    res.status(401).json({ status: 401, message: 'Unauthorized' })
  }
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger)

//                                Root URL

app.get('/', (req, res) => {
  res.send('Hello World!')
});

//                                User Routes

app.get('/api/users', (req, res) => {
  console.log('UsersController#index')
  res.json(UsersController.index())
});

app.get('/api/users/:id', (req, res) => {
  var id = Number(req.params.id);
  console.log('UsersController#show')
  res.json(UsersController.show(id))
});

app.post('/api/users', authMiddleware, (req, res) => {
  console.log('UsersController#create')
  res.json(UsersController.create(req.body))
});

app.delete('/api/users/:id', authMiddleware, (req, res) => {
  var id = Number(req.params.id);
  console.log('UsersController#destroy')
  res.json(UsersController.destroy(id))
});

app.put('/api/users/:id', authMiddleware, (req, res) => {
  var id = Number(req.params.id);
  console.log('UsersController#update')
  res.json(UsersController.update(id, req.body))
});

//                                Product Routes

app.get('/api/products', (req, res) => {
  console.log('ProductsController#index')
  res.json(ProductsController.index())
});

app.get('/api/products/:id', (req, res) => {
  var id = Number(req.params.id);
  console.log('ProductsController#show')
  res.json(ProductsController.show(id))
});

app.post('/api/products', authMiddleware, (req, res) => {
  console.log('ProductsController#create')
  res.json(ProductsController.create(req.body))
});

app.delete('/api/products/:id', authMiddleware, (req, res) => {
  var id = Number(req.params.id);
  console.log('ProductsController#destroy')
  res.json(ProductsController.destroy(id))
});

app.put('/api/products/:id', authMiddleware, (req, res) => {
  var id = Number(req.params.id);
  console.log('ProductsController#update')
  res.json(ProductsController.update(id, req.body))
});
