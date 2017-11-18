const express = require('express');

const router = express.Router();

/**
 * Mock data
 */
const mockData = require('../mock/data.json');
const mockTokens = require('../mock/tokens.json');
const mockUsers = require('../mock/users.json')

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
    send(res, { statusCode: 200, loggedInUser: user });
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
  if(mockTokens[req.body.token]) {
    statusCode = 200;
  }else{
    statusCode = 401;
  }
  send(res, { statusCode: statusCode });
});

function send(res, data) {
  setTimeout(() => {
    res.send(data);
  })
}

module.exports = router;
