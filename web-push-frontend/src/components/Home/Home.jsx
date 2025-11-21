import React, { useEffect } from 'react';
import { initializePushNotifications } from '../../PushNotification';

const Home = () => {
    
    useEffect(() => {
        initializePushNotifications();
    }, []);

  return (
      <div>
        <h1>Web Push Notification Demo</h1>
        <p>Open your browser console to see the FCM token and incoming messages.</p>
      </div>
  );
};

export default Home;