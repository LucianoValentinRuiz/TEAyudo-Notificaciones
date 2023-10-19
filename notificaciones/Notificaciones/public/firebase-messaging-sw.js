// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCV3lvVd31829ku_10vNc4z_f337LNztJc",
  authDomain: "teayudo-notificaciones.firebaseapp.com",
  projectId: "teayudo-notificaciones",
  storageBucket: "teayudo-notificaciones.appspot.com",
  messagingSenderId: "687576040078",
  appId: "1:687576040078:web:dad51affd6bb6b24ad7fdf",
  measurementId: "G-9CWR8HRHQE"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/icon.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });