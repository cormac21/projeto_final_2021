import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyAVF01ndiUUoU3dYmNBBZDV6CS_lCPmVms",
    authDomain: "maturijovem.firebaseapp.com",
    projectId: "maturijovem",
    storageBucket: "maturijovem.appspot.com",
    messagingSenderId: "171973974450",
    appId: "1:171973974450:web:848d9abcd83c6956f4acab"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;