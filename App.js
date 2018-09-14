import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
// import firebase from 'firebase'

// import the different screens
import Loading from './components/Loading';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Main from './components/Main';
import AddMeals from './components/AddMeals';

// const config = {
//   apiKey: "AIzaSyAbMcMoPelfM09L14WZ-mFes-NJv036VjY",
//   authDomain: "planned-pantry.firebaseapp.com",
//   databaseURL: "https://planned-pantry.firebaseio.com",
//   projectId: "planned-pantry",
//   storageBucket: "planned-pantry.appspot.com",
//   messagingSenderId: "557797125374"
// };

// firebase.initializeApp(config);


// create our app's navigation stack
const App = createSwitchNavigator(
  {
    Loading,
    Login,
    SignUp,
    Main,
    AddMeals
  },
  {
    initialRouteName: 'Loading'
  }
);

export default App
