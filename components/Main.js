import React from 'react';
import { StyleSheet, Platform, Image, Text, TextInput, View, Button, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import firebase from 'firebase';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      currentUser: null,
      meal: [] 
    }

    this.getMeals = this.getMeals.bind(this)
    // this.mealDate = this.mealDate.bind(this)
    // this.mealName = this.mealName.bind(this)
    // this.mealTime = this.mealTime.bind(this)
    
  }

  componentDidMount() {
    // const { currentUser } = firebase.auth()

    const that = this;
    this.getMeals(that);
  }

  getMeals(that) {
    const { currentUser } = firebase.auth()
    this.setState( {currentUser} )
    const myState = that.state;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('users/' + user.uid ).child('meal').on('value', data => {
          let returnArr = [];

          data.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);
          });
          returnArr.map(meal => {
            // console.log(meal.key,meal.mealDate,meal.mealTime,meal.mealName)
            return meal
          })
          // console.log(returnArr); 
          that.setState({
            meal: returnArr
          })
          console.log(that.state)
          return returnArr;

        })
      } else {
        // No user is signed in.
      }
    });
  }

  removeMeal(user) {
    console.log('Removing meal')
    firebase.database().ref('users')
    .child('user')
    .child('meal')
    .child('mealName')
    .remove();
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

    const { currentUser } = this.state;
    
    return (
      <View style={styles.container}>
        <Text>
          Welcome {currentUser && currentUser.email}!
        </Text>
        <List containerStyle={{marginBottom: 20,width: 80}}> 
          {
            this.state.meal.map(meal => (
            <ListItem
              key={meal.key}
              mealDate={meal.mealDate}
              meaName={meal.mealName}
              mealTime={meal.mealTime}
            />
            ))
          }
        </List> 

        <Button title="Add Meal" onPress={() => {this.props.navigation.navigate('Meals')}} />
        <Button title="Logout" onPress={this.signOut} />
        {/* <Button title="Remove Meal" onPress={this.removeMeal} /> */}

      </View>
    )
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
});

