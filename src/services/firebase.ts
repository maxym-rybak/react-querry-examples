// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDGTsWeOHdUcYJKzkXNiHHHLBLJdfAkfc8',
  authDomain: 'stolen-pokemon.firebaseapp.com',
  databaseURL: 'https://stolen-pokemon-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'stolen-pokemon',
  storageBucket: 'stolen-pokemon.appspot.com',
  messagingSenderId: '942379819639',
  appId: '1:942379819639:web:47b50ab2133ae4c8ecdc72',
  measurementId: 'G-55G8NRPZ4W',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
