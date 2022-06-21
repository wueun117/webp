import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyAmQSRJglVY5tvpeI9tekYx7kakMftSK8w",
    authDomain: "webp-3b12d.firebaseapp.com",
    projectId: "webp-3b12d",
    storageBucket: "webp-3b12d.appspot.com",
    messagingSenderId: "999444806091",
    appId: "1:999444806091:web:bc582d5ea24844f4769e4e",
    measurementId: "G-JEY3E6094L"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;