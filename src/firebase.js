import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyDPdyGq_dPW-pKC4LAsh7y34kk6u31rTy4',
  authDomain: 'droplr-94e9a.firebaseapp.com',
  databaseURL: 'https://droplr-94e9a.firebaseio.com',
  projectId: 'droplr-94e9a',
  storageBucket: 'droplr-94e9a.appspot.com',
  messagingSenderId: '1046074809241'
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();