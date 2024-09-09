import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration for your app
const firebaseConfig = {
  apiKey: 'AIzaSyCCZ-M5sIrSvoBMIAgPY0VRtIcyS7H_T_k',
  authDomain: 'myfitwave-86bb6.firebaseapp.com',
  projectId: 'myfitwave-86bb6',
  storageBucket: 'myfitwave-86bb6.appspot.com',
  messagingSenderId: '835890473974',
  appId: '1:835890473974:ios:af7e5625b4c73372c035d7',
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
