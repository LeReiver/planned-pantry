import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

// import the different screens
import Loading from './components/Loading';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Main from './components/Main';
import AddMeals from './components/AddMeals';

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
