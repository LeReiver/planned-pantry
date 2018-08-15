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

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log(user);

        firebase.database().ref('users/' + user.uid ).child('meal').on('value', data => {
          // console.log(data)
            var returnArr = [];
        
            data.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
        
                returnArr.push(item);
            });
            // this.setState({
            //   meal: returnArr
            // })
            // console.log(returnArr)
        })
    //     const meal = [
    //       {
    //       mealDate: '2018-08-27',
    //       mealName: 'tacos',
    //       mealTime: 'dinner'
    //       },
    //       {
    //         mealDate: '2018-08-27',
    //         mealName: 'salad',
    //         mealTime: 'lunch'
    //       },
    //       {
    //         mealDate: '2018-08-28',
    //         mealName: 'tacos',
    //         mealTime: 'lunch'
    //       },
    //       {
    //         mealDate: '2018-08-28',
    //         mealName: 'pizza',
    //         mealTime: 'dinner'
    //       }
    //   ];
    //   firebase.database.ref('users').child(meal).set(meal)
    //   .then(meal => console.log(meal))
    //   .catch(err => console.log(err))
    //   } else {
    //     // No user is signed in.
    //   }
    // });

      }
    })
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
        mealName: 'tacos',
        mealTime: 'lunch'
      },
      {
        mealDate: '2018-08-28',
        mealName: 'pizza',
        mealTime: 'dinner'
      }
    ];
    firebase.database().ref('users/' + userId).set(
      {
        meal: meal,
      })
      .then(() => {
        // console.log('Added Meal')
      })
      .catch(err => console.log(err))


    firebase.database().ref('users').once('value', data => {
      // console.log(data.toJSON());
      data.toJSON()
    })
  
  
  //   const snapshotToArray = snapshot => {
  //     var returnArr = [];
  
  //     snapshot.forEach(function(childSnapshot) {
  //       var item = childSnapshot.val();
  //       item.key = childSnapshot.key;
  //       returnArr.push(item);
  //     });

  //     // console.log(returnArr)
  //     // returnArr = returnArr.map(l => console.log(l));
  //     // console.log(returnArr)
  //   };

  //   firebase.database().ref('/users').on('value', function(snapshot) {
  //     // console.log(snapshotToArray(snapshot));
  //     snapshotToArray(snapshot);
  //   });

  };

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


  getMeals(user) {
    firebase.database().ref('users/' + userId ).on('value', data => {
      console.log(data)
      let meal = data.toJSON()
      console.log('Retrieved meals')
      // console.log(meal);
    })
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
    
    const snapshotToArray = snapshot => {
      var returnArr = [];
  
      snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
  
          returnArr.push(item);
      });
      // console.log(returnArr)
      return returnArr;
    };
  
    firebase.database().ref('/users').on('value', function(snapshot) {
      snapshotToArray(snapshot);
    });

    return (
      <View style={styles.container}>
        <Text>
          Welcome {currentUser && currentUser.email}!
          {/* {this.addMeal(currentUser)} */}
          {/* {this.getMeals(currentUser)} */}
        </Text>
        <List containerStyle={{marginBottom: 20}}> 
        {
        this.state.meal.map((l) => (
          <ListItem
            meaName={l.mealName}
            mealDate={l.mealDate}
            key={l.key}
            mealTime={l.mealTime}
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

