## 🚀 Web Push Notifications using Firebase + React + Node.js
A full-stack implementation of Web Push Notifications using:

<ul>
  <li> Firebase Cloud Messaging (FCM)</li>
  <li>React (Frontend)</li>
  <li>Node.js + Express (Backend)</li>
  <li>Service Workers for background notifications</li>
  <li>Manual Token Saving + Broadcast Notifications</li>
</ul>

This project demonstrates how to request notification permission, retrieve the FCM token, send it to a backend server, and trigger real-time push notifications from the server.
<br>
<hr>

## 📌Features
### 🔔 Frontend (React)
<ul>
  <li>Requests notification permission from the browser</li>
  <li>Generates and logs FCM device tokens</li>
  <li>Registers firebase-messaging-sw.js service worker</li>
  <li>Displays foreground notifications</li>
  <li>Listens for background messages (via service worker)</li>
</ul>
<br>

### 🖥️ Backend (Node.js)
<ul>
  <li>Stores FCM device tokens in memory</li>
  <li>
    Send notification to:
    <ul> 
      <li>Single token</li>
      <li>All saved tokens (Broadcast)</li>
    </ul>
  </li>
  <li>Firebase Admin SDK integrated using .env variables</li>
  <li>
    Simple REST endpoints:
    <ul>
      <li>POST /save-token </li>
      <li>POST /send-notification</li>
      <li>POST /broadcast</li>
    </ul>
  </li>
</ul>

<br>
<hr>

## 📁 Project Structure
```sh
WEB-PUSH/
│
├── web-push-backend/
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── node_modules/
│
└── web-push-frontend/
    ├── public/
    │   ├── firebase-messaging-sw.js
    │   └── index.html
    ├── src/
    │   ├── FirebaseInit.js
    │   ├── PushNotification.js
    │   └── components/Home/Home.jsx
    ├── package.json
    └── node_modules/
```

<br>

## 🛠️ Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Rashim-Sunar/WEB-PUSH-NOTIFICATION.git
```

<br>

## 🔧 Backend Setup (Node.js + Express)
### 2️⃣ Install Dependencies
```sh
cd web-push-backend
npm install
```

### 3️⃣ Configure Firebase Admin Credentials
Create a .env file in web-push-backend/:
<br><br>
Paste the .json file you downloaded from the firebase in .env file. You can also use the credentials by reading the json file directly.
```sh
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=web-push-notification-XXXX
FIREBASE_PRIVATE_KEY_ID=YOUR_PRIVATE_KEY_ID
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOURKEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@firebase-adminsdk.com
FIREBASE_CLIENT_ID=YOUR_CLIENT_ID
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/YOUR_EMAIL
```
⚠️ Make sure your private key contains \n, not actual line breaks.

### 4️⃣ Start the Backend Server
```sh
npm start
```
Your backend runs at:
<a> 👉 http://localhost:8000</a>

<br>

## 🖥️ Frontend Setup (React)
### 5️⃣ Install Dependencies
```sh
cd web-push-frontend
npm install
```

### 6️⃣ Start React App
```sh
npm start
```

Your frontend runs at: <a>👉 http://localhost:3000</a>

<br>
<hr>

## 🔥 Firebase Configuration
### Add these inside: 

#### FirebaseInit.js
```sh
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default messaging;
```
<br>

### 📡 Service Worker Setup
#### firebase-messaging-sw.js
```sh
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});

```
### 📬 How Notifications Work
<ol type='1'>
  <li>User visits site</li>
  <li>Browser asks for Notification permission</li>
  <li>FCM token is generated</li>
  <li>Token is sent to backend (/save-token)</li>
  <li>Backend sends notifications</li>
</ol>

<br>
<hr>

##  📤 Sending Notifications (API Endpoints)
### 👉 Send to a specific device:
#### POST http://localhost:8000/send-notification
```sh
{
  "token": "DEVICE_FCM_TOKEN",
  "title": "Hello User!",
  "body": "This is a direct notification."
}
```
#### To get the token:
Open browser console → token logs appear 

### 👉 Broadcast to all saved tokens:
#### POST http://localhost:8000/broadcast
```sh
{
  "title": "Announcement",
  "body": "This is a broadcast message."
}
```

<br>
<hr>

## 📚 Additional Documentation

This project was built following the detailed documentation below.  
👉 **https://dev.to/emmanuelayinde/web-push-notifications-with-react-and-firebase-cloud-messaging-fcm-18kb**





