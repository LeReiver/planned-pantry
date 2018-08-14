import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, FlatList } from 'react-native';
import firebase from 'firebase';

export default class Main extends React.Component {
  state = { 
    currentUser: null,
    // meal = [] 
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log(user);
      } else {
        // No user is signed in.
      }
    });

  }

  addMeal(user) {
    const userId = firebase.auth().currentUser.uid;
    const meal = [
      {
      mealDate: '2018-08-27',
      mealName: 'tacos',
      mealTime: 'dinner'
      },
      {
        mealDate: '2018-08-27',
        mealName: 'salad',
        mealTime: 'lunch'
      },
      {
        mealDate: '2018-08-28',
        mealName: 'soup',
        mealTime: 'lunch'
      },
      {
        mealDate: '2018-08-28',
        mealName: 'sushi',
        mealTime: 'dinner'
      }
  ];
    firebase.database().ref('users/' + userId).set(
      {
        meal: meal,
      })
      .then(() => {
        console.log('Added Meal')
      })
      .catch(err => console.log(err))
    console.log(user)


    firebase.database().ref('users').once('value', data => {
      console.log(data.toJSON());
    })
  };

  getMeals(user) {
    firebase.database().ref('users').on('value', data => {
      data.toJSON()
      // console.log(mealName.toJSON());
      console.log('Retrieved meals')
    })
      // .orderByChild('mealDate');
  }

  removeMeal(user) {
    firebase.database().ref('users')
    .child('user')
    // .child('mealName')
    .child('meal')
    .child('mealName')
    .remove();
      console.log('Removed meal')
  }


  signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('you have logged out')
    }).catch(function(error) {
      // An error happened.
    });
  }


  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text>
          Welcome {currentUser && currentUser.email}!
          {this.addMeal(currentUser)}
          {this.getMeals(currentUser)}
        </Text>
        <Button title="Logout" onPress={this.signOut} />
        {/* <Button title="Remove Meal" onPress={this.removeMeal} /> */}

        <FlatList data={this.state.meal}
          renderItem={this.renderMeals}
        />
      </View>
    )
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

