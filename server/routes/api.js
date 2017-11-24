const express = require('express');
const router = express.Router();

/**
 * Mock data
 */
const mockData = require('../mock/data.json');
const mockTokens = require('../mock/tokens.json');
const mockUsers = require('../mock/users.json');

/**
 * Api routes
 */
router.get('/', (req, res) => {
  send(res, { statusCode: 200, data: mockData });
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;  
  const user = getUser(username, password);
  if(user) {
    send(res, { statusCode: 200, loggedInUser: user});
  }else {
    send(res, { statusCode: 400, data: null });
  }
});

function getUser(username, password) {
  for(let user of mockUsers) {
    if(user.username === username && user.password === password) {
      return user;
    }
  }
}

router.post('/auth', (req, res) => {
  let statusCode; 
  let user;
  const token = req.body.token;
  if(mockTokens[token]) {
    statusCode = 200;
    user = getUserByToken(token);
    send(res, { statusCode: statusCode, loggedInUser: user });
  }else{
    statusCode = 401;
    send(res, { statusCode: statusCode, error: 'authentication failed' });
  }
});

function getUserByToken(token) {
  return mockUsers.filter(function(user) {
    return user.token === token;
  })[0];
}

function send(res, data) {
  setTimeout(() => {
    res.send(data);
  },1000);
}

module.exports = router;
