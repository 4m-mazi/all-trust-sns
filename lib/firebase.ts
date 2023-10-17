import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  ReCaptchaV3Provider,
  getToken,
  initializeAppCheck,
} from 'firebase/app-check';
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

export const firebase =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

if (typeof document !== 'undefined') {
  if (process.env.NODE_ENV === 'development') {
    window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  const appCheck = initializeAppCheck(firebase, {
    provider: new ReCaptchaV3Provider(
      '6LdzG6woAAAAAHQM0G-v57ZFxT37KkSW6P6dmCSa',
    ),
    isTokenAutoRefreshEnabled: true,
  });

  getToken(appCheck)
    .then(() => {
      console.log('AppCheck:Success');
    })
    .catch((error) => {
      console.log(error.message);
    });
}
const db = getFirestore();

export { db };
