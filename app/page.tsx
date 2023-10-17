'use client';
import { useEffect } from 'react';
import styles from './page.module.css';

// Import the functions you need from the SDKs you need
import { Box } from '@kuma-ui/core';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

export default function Home() {
  useEffect(() => {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: 'AIzaSyCtwQsjRg6eFfIbrTmAeU-crKep_cSQF6Q',
      authDomain: 'all-trust-sns.firebaseapp.com',
      projectId: 'all-trust-sns',
      storageBucket: 'all-trust-sns.appspot.com',
      messagingSenderId: '291700971474',
      appId: '1:291700971474:web:95d0d5691fb97c4c6e5a0b',
      measurementId: 'G-ST4KTTQE6B',
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  });
  return (
    <main className={styles.main}>
      <Box p={8} bg="blue" color="white">
        Hello world 完成！
      </Box>
    </main>
  );
}
