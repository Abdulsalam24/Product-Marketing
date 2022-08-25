
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFireStore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOERKXLvapu9sfZqKmVHIPLVkJIfmMyvQ",
  authDomain: "product-marketing-eca4c.firebaseapp.com",
  projectId: "product-marketing-eca4c",
  storageBucket: "product-marketing-eca4c.appspot.com",
  messagingSenderId: "73223934808",
  appId: "1:73223934808:web:94b7e7e1a47a953d854b2d",
  measurementId: "G-PST0WEEYFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFireStore()

console.log(db)