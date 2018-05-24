const _ = require('lodash')
const User = require('../models/user')

var _user_params = function(params) {
  return _.pick(params, ['name']);
}

module.exports = {
  index() {
    return User.getUsers();
  },

  show(id) {
    return User.getUser(id);
  },

  create(params) {
    return User.createUser(_user_params(params));
  },

  update(id, params) {
    return User.updateUser(id, _user_params(params));
  },

  destroy(id) {
    return User.deleteUser(id);
  },
}
