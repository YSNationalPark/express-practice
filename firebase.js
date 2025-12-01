var admin = require("firebase-admin"); //npm i firebase-admin --save

var serviceAccount = require("./firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;