importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBMUlm_C5ZGtcOr5FPqA8WszQebnJGolOA',
  authDomain: 'police-dispatch-2ede5.firebaseapp.com',
  databaseURL: 'https://police-dispatch-2ede5.firebaseio.com',
  projectId: 'police-dispatch-2ede5',
  storageBucket: 'police-dispatch-2ede5.appspot.com',
  messagingSenderId: '812848255718',
  appId: '1:812848255718:web:acc9d509f750e229796127',
  measurementId: 'G-QXJYCX6186'
});

const messaging = firebase.messaging();
