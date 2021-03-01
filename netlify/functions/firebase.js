const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyCP7OB-YlUCqEf3m8XccoEWZSUzFiZJ_7Q",
  authDomain: "kellogg-1307.firebaseapp.com",
  databaseURL: "https://kellogg-1307.firebaseio.com",
  projectId: "kellogg-1307",
  storageBucket: "kellogg-1307.appspot.com",
  messagingSenderId: "764850989121",
  appId: "1:764850989121:web:75de8e37cc855fed233ec0",
  measurementId: "G-8QVL0JQ747"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase