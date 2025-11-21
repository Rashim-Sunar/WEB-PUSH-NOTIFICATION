import messaging from './FirebaseInit';
import { getToken, onMessage } from 'firebase/messaging';

export const initializePushNotifications = () => {
  // Request permission for push notifications
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Get the token from the messaging service
      return getToken(messaging);
    } else {
      console.log('Unable to get permission to notify.');
    }
  }).then((token) => {
    console.log('FCM Token:', token);
    // Send this token to your server to associate it with the user
  }).catch((err) => {
    console.error('Error getting notification permission:', err);
  });

  // Handle incoming messages
  onMessage(messaging, (payload) => {
    console.log('Message received:', payload);
    // Display notification using Notification API
    if (Notification.permission === 'granted') {
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon
      });
    }
  });
};
