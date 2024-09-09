import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCZ-M5sIrSvoBMIAgPY0VRtIcyS7H_T_k",
  authDomain: "myfitwave-86bb6.firebaseapp.com",
  projectId: "myfitwave-86bb6",
  storageBucket: "myfitwave-86bb6.appspot.com",
  messagingSenderId: "835890473974",
  appId: "1:835890473974:ios:af7e5625b4c73372c035d7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
