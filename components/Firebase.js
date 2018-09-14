import firebase from 'firebase';
// import { Firebase } from 'react-native-firebase';
import { API_KEY } from 'react-native-dotenv'

const config = {
  apiKey: API_KEY,
  authDomain: "planned-pantry.firebaseapp.com",
  databaseURL: "https://planned-pantry.firebaseio.com",
  projectId: "planned-pantry",
  storageBucket: "planned-pantry.appspot.com",
  messagingSenderId: "557797125374"
};


export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();