const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const firebaseConfig = {
  apiKey: "AIzaSyDoYUallthmtvnmJxmVvAiKHFdsBKNJWdE",
  authDomain: "gehna-50a31.firebaseapp.com",
  projectId: "gehna-50a31",
  storageBucket: "gehna-50a31.appspot.com",
  messagingSenderId: "343780785875",
  appId: "1:343780785875:web:5bc7e59682c43ebbda5e26",
  measurementId: "G-77BH6JW4YH"
};

// admin.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  ...firebaseConfig,
});

const bucket = admin.storage().bucket();

module.exports = bucket;



