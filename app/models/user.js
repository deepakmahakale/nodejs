const _ = require('lodash')

let users = [
  {id: 1, name: 'john doe'},
  {id: 2, name: 'jimmy frost'},
  {id: 3, name: 'jacob lee'},
]

var getNextId = function(collection) {
  if(!collection.length) {
    return 1;
  }
  return(Math.max(...collection.map((c) => c.id)) + 1);
}

var findUser = function(id) {
  // return users.find(user => user.id === id);
  // _.find(users, (u) => { return u.id === id });
  return _.find(users, function (u) { return u.id === id });
}

module.exports = {
  getUsers() {
    return users;
  },

  getUser(id) {
    return findUser(id)
  },

  createUser(params) {
    var newUser = {
      id: getNextId(users),
      ...params
    };
    users.push(newUser);
    return newUser;
  },

  updateUser(id, params) {
    var user = findUser(id)
    _.each(params, (val, key) => { user[key] = val })
    return user;
  },

  deleteUser(id) {
    var user = findUser(id)
    _.remove(users, (u) => { return u.id === user.id });
    return user
  },
}
