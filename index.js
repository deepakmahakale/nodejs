const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const UsersController = require('./app/controllers/users_controller')

app.listen(3000, () => console.log('Listening on port 3000!'));

//                                Middlewares

// Logger Middleware
logger = function (req, res, next) {
  console.log(req.method + ' ' + req.url);
  console.log('Body: ');
  console.log(req.body);
  next();
}

// Auth Middleware
authMiddleware = function(req, res, next) {
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
  id = Number(req.params.id);
  console.log('UsersController#show')
  res.json(UsersController.show(id))
});

app.post('/api/users', authMiddleware, (req, res) => {
  console.log('UsersController#create')
  res.json(UsersController.create(req.body))
});

app.delete('/api/users/:id', authMiddleware, (req, res) => {
  id = Number(req.params.id);
  console.log('UsersController#destroy')
  res.json(UsersController.destroy(id))
});

app.put('/api/users/:id', authMiddleware, (req, res) => {
  id = Number(req.params.id);
  console.log('UsersController#update')
  res.json(UsersController.update(id, req.body))
});
