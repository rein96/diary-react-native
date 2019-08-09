import firebase from 'firebase'

  // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDEWcACek_trgX04ib-KYrhaGgUqmLg9RQ",
    authDomain: "reinhartreactnative.firebaseapp.com",
    databaseURL: "https://reinhartreactnative.firebaseio.com",
    projectId: "reinhartreactnative",
    storageBucket: "",
    messagingSenderId: "711322242672",
    appId: "1:711322242672:web:d7734bf73357baf9"
};

// Initialize Firebase
export default Fire =  firebase.initializeApp(firebaseConfig);