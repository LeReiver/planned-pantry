import firebase from 'firebase';
// import { Firebase } from 'react-native-firebase';

const config = {
  apiKey: "AIzaSyAbMcMoPelfM09L14WZ-mFes-NJv036VjY",
  authDomain: "planned-pantry.firebaseapp.com",
  databaseURL: "https://planned-pantry.firebaseio.com",
  projectId: "planned-pantry",
  storageBucket: "planned-pantry.appspot.com",
  messagingSenderId: "557797125374"
};

firebase.initializeApp(config);


export default firebase;