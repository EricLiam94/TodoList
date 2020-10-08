import firebase from 'firebase/app';
import "firebase/auth";
const dotenv = require("dotenv")
dotenv.config()
const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID,
}
firebase.initializeApp(config);
firebase.analytics()
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth();

export const db = firebase.database();

export const signInWithGoogle = () => auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function () {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return auth.signInWithPopup(googleProvider)
    })
    .catch(function (error) {
        // Handle Errors here.
        console.log(error)
    });

