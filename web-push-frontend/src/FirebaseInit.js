import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCyZm-fNPqMqwPQ2u_r5SuEQlQK09KczxA",
  authDomain: "web-push-notification-cbd67.firebaseapp.com",
  projectId: "web-push-notification-cbd67",
  storageBucket: "web-push-notification-cbd67.firebasestorage.app",
  messagingSenderId: "73600311482",
  appId: "1:73600311482:web:38e0b5c2f7eb1425aea283",
  measurementId: "G-0N40CBMCQM"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default messaging;
