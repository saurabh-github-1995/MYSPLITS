importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js');
  firebase.initializeApp({
    apiKey: "AIzaSyBJz1rUOFH_5ZwfYNWmhU2OzGYHwk7c7_8",
    authDomain: "mysplits-9bf8f.firebaseapp.com",
    databaseURL: "https://mysplits-9bf8f.firebaseio.com",
    projectId: "mysplits-9bf8f",
    storageBucket: "mysplits-9bf8f.appspot.com",
    messagingSenderId: "367106531416",
    appId: "1:367106531416:web:2e4e1dfc98e0a2583b2a2d",
    measurementId: "G-DC2YSWE67T"


});
  const messaging = firebase.messaging();
