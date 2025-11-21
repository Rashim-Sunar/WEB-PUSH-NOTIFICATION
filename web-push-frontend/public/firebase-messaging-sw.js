if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }

// ----------------------------- BELOW PART OF GET NOTIFICATION on website configuration ---------------------------------

    // Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCyZm-fNPqMqwPQ2u_r5SuEQlQK09KczxA",
  authDomain: "web-push-notification-cbd67.firebaseapp.com",
  projectId: "web-push-notification-cbd67",
  storageBucket: "web-push-notification-cbd67.firebasestorage.app",
  messagingSenderId: "73600311482",
  appId: "1:73600311482:web:38e0b5c2f7eb1425aea283",
  measurementId: "G-0N40CBMCQM"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
