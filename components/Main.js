import React from 'react';
import { StyleSheet, Platform, Image, Text, TextInput, View, Button, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import firebase from 'firebase';
import Meals from './Meals';
import DatePicker from './date-picker';

export default class Main extends React.Component {
  state = { 
    currentUser: null,
    meal: [] 
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })

    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {

    //     firebase.database().ref('users/' + user.uid ).child('meal').on('value', data => {
    //       let returnArr = [];
    //       let meals;
      
    //       data.forEach(function(childSnapshot) {
    //           var item = childSnapshot.val();
    //           item.key = childSnapshot.key;
      
    //           returnArr.push(item);
    //       });
    //       meals = returnArr.map(meal => {
    //         let mealDate = meal.mealDate;
    //         let mealName = meal.mealName;
    //         let mealTime = meal.mealTime;
    //         console.log(mealDate,mealName,mealTime)
    //       })
    //       return meals;
    //     })
    //   } else {
    //     // No user is signed in.
    //   }
    // });
  }

  // addMeal(user) {
  //   const userId = firebase.auth().currentUser.uid;
  //   const meal = [
  //     {
  //     mealDate: '2018-08-27',
  //     mealName: 'toast',
  //     mealTime: 'breakfast'
  //     },
  //     {
  //       mealDate: '2018-08-27',
  //       mealName: 'salad',
  //       mealTime: 'lunch'
  //     },
  //     {
  //       mealDate: '2018-08-28',
  //       mealName: 'burger',
  //       mealTime: 'dinner'
  //     }
  //   ];
  //   firebase.database().ref('users/' + userId).set(
  //     {
  //       meal: meal,
  //     })
  //     .then(() => {
  //       // console.log('Added Meal')
  //     })
  //     .catch(err => console.log(err))


  //   firebase.database().ref('users').once('value', data => {
  //     // console.log(data.toJSON());
  //     data.toJSON()
  //   })
  
  
  // //   const snapshotToArray = snapshot => {
  // //     var returnArr = [];
  
  // //     snapshot.forEach(function(childSnapshot) {
  // //       var item = childSnapshot.val();
  // //       item.key = childSnapshot.key;
  // //       returnArr.push(item);
  // //     });

  // //     // console.log(returnArr)
  // //     // returnArr = returnArr.map(l => console.log(l));
  // //     // console.log(returnArr)
  // //   };

  // //   firebase.database().ref('/users').on('value', function(snapshot) {
  // //     // console.log(snapshotToArray(snapshot));
  // //     snapshotToArray(snapshot);
  // //   });

  // };

  // addMeal(user) {

  //   console.log('Adding Meal')
  //   firebase.database().ref('users').set(
  //       {
  //           // mealName: this.state.meal.mealName,
  //           // mealTime: this.state.meal.mealTime,
  //           // mealDate: this.state.meal.mealDate
  //     })
  //     .then(() => {
  //         console.log('Added Meal')
  //         // this.setState({
  //         //   ...meal
  //         // })
  //       })
  //     .catch(err => console.log(err))
  //     }


  getMeals() {
    // const userId = firebase.auth().currentUser.uid;
    // firebase.database().ref('users/' + userId ).on('value', data => {
    //   data.toJSON()
    // })

    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {

    //     firebase.database().ref('users/' + user.uid ).child('meal').on('value', data => {
    //       let returnArr = [];
    //       let meals;
      
    //       data.forEach(function(childSnapshot) {
    //         var item = childSnapshot.val();
    //         item.key = childSnapshot.key;
    
    //         returnArr.push(item);
    //       });
    //       meals = returnArr.map(meal => {
    //         let mealDate = meal.mealDate;
    //         let mealName = meal.mealName;
    //         let mealTime = meal.mealTime;
    //         console.log(mealDate,mealName,mealTime)
    //       })
    //       return meals;
    //     })
    //   } else {
    //     // No user is signed in.
    //   }
    // });
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
    let returnArr;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        firebase.database().ref('users/' + user.uid ).child('meal').on('value', data => {
          let returnArr = [];
          let meals;

          data.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
    
            returnArr.push(item);
          });
          returnArr.map(meal => {
            let mealDate = meal.mealDate;
            let mealName = meal.mealName;
            let mealTime = meal.mealTime;
            console.log(mealDate,mealName,mealTime)
          })
          return returnArr;
        })
      } else {
        // No user is signed in.
      }

      return returnArr;
    });

    return (
      <View style={styles.container}>
        <Text>
          Welcome {currentUser && currentUser.email}!
          {/* {this.addMeal(currentUser)} */}
          {/* {this.getMeals(currentUser)} */}
        </Text>
        <List containerStyle={{marginBottom: 20}}> 
          {/* {
            returnArr.map(meal => (
            <ListItem
              mealDate = {meal.mealDate}
              meaName = {meal.mealName}
              mealTime = {meal.mealTime}
            />
            ))
          } */}
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

