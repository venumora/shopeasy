import firebaseConfig from '../config/FirebaseConfig';
import firebase from 'firebase';

const FirebaseUtil = function () {
    this.initialize = function () {
        firebase.initializeApp(firebaseConfig)
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    };

    this.signIn = function (role, onAuthenticationCallBack) {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const token = result.credential.accessToken;
            const user = result.user;
            onAuthenticationCallBack(role);
        }).catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
        });
    }

    this.signOut = function (handleSignOut) {
        firebase.auth().signOut().then(function() {
            handleSignOut();            
        });
    }

    this.checkIsAuthenticated = function (callBack) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                callBack();
            }
        });
    }
}

export default new FirebaseUtil();