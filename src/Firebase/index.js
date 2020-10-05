import * as firebase from "firebase/app";
import "firebase/auth";
const config = {
    apiKey: "AIzaSyChmkMyPnXz6pgLjGs-IYXfBgcokD8jED4",
    authDomain: "todo-92284.firebaseapp.com",
    databaseURL: "https://todo-92284.firebaseio.com",
    projectId: "todo-92284",
    storageBucket: "todo-92284.appspot.com",
    messagingSenderId: "1074837530857",
    appId: "1:1074837530857:web:3ec8a57d719da12868a878",
    measurementId: "G-SJCZ4PSJVZ",
}
firebase.initializeApp(config);
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth();

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
        var errorCode = error.code;
        var errorMessage = error.message;
    });

