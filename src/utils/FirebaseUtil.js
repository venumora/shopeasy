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
            const user = result.user;
            onAuthenticationCallBack(true, role, user.uid);
        }).catch(function (error) {
            onAuthenticationCallBack(false);            
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
                callBack(true, '', user);
            } else {
                callBack(false);
            }
        });
    }
}

export default new FirebaseUtil();