var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyC_fZLT2Iofr7e_tvT0cgKsjI3gA2d-O6I",
  authDomain: "w-f-m-4f195.firebaseapp.com",
  databaseURL: "https://w-f-m-4f195.firebaseio.com",
  projectId: "w-f-m-4f195",
  storageBucket: "w-f-m-4f195.appspot.com",
  messagingSenderId: "525567242875"
};
var fire = firebase.initializeApp(config);
module.exports = fire;
