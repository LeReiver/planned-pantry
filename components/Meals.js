import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker'

export default class Meals extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            mealName: '',
            mealTime: '',
            date: ''
        }
    }
    
    componentWillMount() {
        // const { currentUser } = firebase.auth()
        // this.setState({ 
        //   currentUser
        // })

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            return user;
          } else {
            // No user is signed in.
          }
        })
    }

    getDate() {
      return (
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2018-08-01"
          maxDate="2028-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              width: 30
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
      )
    }

    addMeal() {
      let mealName = this.state.mealName;
      let mealTime = this.state.mealTime;
      let mealDate = this.state.date;

      const userId = firebase.auth().currentUser.uid;
      console.log('Adding Meal', userId)
      firebase.database().ref('users/' + userId + '/meal').push(
          {
            mealName: mealName,
            mealTime: mealTime,
            mealDate: mealDate
        })
        .then(() => {
            console.log('Added Meal')

          })
        .catch(err => console.log(err))
    }



    render() {

        return (
          <View style={styles.container}>
           
        <Text>Add A Meal</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Meal Name"
            onChangeText={mealName => this.setState({ mealName })}
            value={this.state.mealName}
            required
          />
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Meal Time"
            onChangeText={mealTime => this.setState({ mealTime })}
            value={this.state.mealTime}
            required
          />
          <DatePicker 
            style={styles.textInput}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2018-08-01"
            maxDate="2028-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                width: '70%'
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
          <Button title="Add" onPress={() => this.addMeal()} />
          <Button title="Show Meals" onPress={() => {this.props.navigation.navigate('Main')}} />
          </View>
        )
    }
}


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
