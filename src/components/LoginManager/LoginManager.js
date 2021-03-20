import firebase from 'firebase/app'
import "firebase/auth";
import { firebaseConfig } from './firebaseconfig';

export const firebaseInitialize = ()=> {
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
}

export const googleSignInHandler = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then((res) => {
            const user = res.user;
            return user;
        }).catch((error) => {
            const errorMessage = error.message;
            return errorMessage;
        });
}

export const fbSignInHandler = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then((res) => {
            const user = res.user;
            return user;
        })
        .catch((error) => {
            const errorMessage = error.message;
            return errorMessage;
        });
}
export const twitterSignInHandler = () => {
    const twitterProvider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(twitterProvider)
    .then((res) => {
    const user = res.user;
    return user;
  }).catch((error) => {
    const errorMessage = error.message;
    return errorMessage;
  });
}
export const githubSignInHandler = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(githubProvider)
    .then((res) => {
    const user = res.user;
    return user
  }).catch((error) => {
    const errorMessage = error.message;
    return errorMessage;
  });
}
export const createUser = (name, email , password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            updateUserName(name)
            return res.user;
        })
        .catch((error) => {
            const errorMessage = error.message;
            return errorMessage;
        });
}
const updateUserName = name =>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('user name updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }
export const signOutHandler = () => {
    return firebase.auth().signOut()
    .then((res) => {
        console.log('sign out success');
        return '';
    }).catch((error) => {
        return error;
    });
}
export const logInHandler = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const user = res.user;
            return user;
        })
        .catch((error) => {
            const errorMessage = error.message;
            return errorMessage;
        });
}