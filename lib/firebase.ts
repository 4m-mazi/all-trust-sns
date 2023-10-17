import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

// これらの値はFirebase Consoleで取得できます
const firebaseConfig = {
  apiKey: 'AIzaSyCtwQsjRg6eFfIbrTmAeU-crKep_cSQF6Q',
  authDomain: 'all-trust-sns.firebaseapp.com',
  projectId: 'all-trust-sns',
  storageBucket: 'all-trust-sns.appspot.com',
  messagingSenderId: '291700971474',
  appId: '1:291700971474:web:95d0d5691fb97c4c6e5a0b',
  measurementId: 'G-ST4KTTQE6B',
};

if (typeof window !== undefined) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

export { db, firebase };
