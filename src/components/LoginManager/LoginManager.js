import React, { createContext, useContext } from 'react';
import firebase from 'firebase/app'
import "firebase/auth";
import { firebaseConfig } from './firebaseconfig';
import { useHistory } from 'react-router';

export const firebaseInitialize = ()=> {
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
}

export const googleSignInHandler = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;
            return user;
            // setUserauth({
            //     isSignIn: true,
            //     name: user.displayName,
            //     email: '',
            //     image: user.photoURL
            // });
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            return errorMessage;
        });
    // console.log('clicked');
}

export const fbSignInHandler = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            const credential = result.credential;
            const user = result.user;
            const accessToken = credential.accessToken;
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            return errorMessage;
        });
}
export const twitterSignInHandler = () => {
    const twitterProvider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(twitterProvider)
    .then((result) => {
    const credential = result.credential;
    const token = credential.accessToken;
    const secret = credential.secret;
    const user = result.user;
    return user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
  });
}
export const githubSignInHandler = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(githubProvider)
    .then((res) => {
    const credential = res.credential;
    const token = credential.accessToken;
    const user = res.user;
    return user
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    return errorMessage;
  });
}
export const createUser = (email , password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            return res.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return errorMessage;
        });
}
export const signOutHandler = () => {
    return firebase.auth().signOut()
    .then((res) => {
        console.log('sign out success');
        // setUserauth({
        //     isSignIn: false,
        //     name: '',
        //     email: '',
        //     image: ''
        // });
        return res;
        
    }).catch((error) => {
        // An error happened.
        return error;
    });
}
export const logInHandler = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const user = res.user;
            return user
            // setLoggedUser(true);
            // history.replace(from);
            // console.log(user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return errorMessage;
        });
}