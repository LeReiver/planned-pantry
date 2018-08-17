import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Picker } from 'react-native';
import { Header } from 'react-native-elements'
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
      firebase.database().ref('users/' + userId + '/meal').push(
          {
            mealName: mealName,
            mealTime: mealTime,
            mealDate: mealDate
        })
        .then(() => {
          this.props.navigation.navigate('Main')

          })
        .catch(err => console.log(err))
    }



    render() {

        return (
          <View style={styles.container}>
           <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'Planned Pantry', style: { color: '#3c9', fontSize: 30, marginTop: 20 } }}
          outerContainerStyles={{ backgroundColor: '#3D6DCC', width: '100%', height: 100}}
          innerContainerStyles={{ justifyContent: 'space-around', height: 50 }}
          />
          <Text style={styles.title}>Add A Meal</Text>
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
          {/* <Picker
            selectedValue={this.state.mealTime}
            style={{ height: 50, width: 100,marginBottom: 0, marginTop: 0 }}
            onValueChange={mealTime => this.setState({ mealTime })}>
            <Picker.Item label="Breakfast" value="Breakfast" />
            <Picker.Item label="Lunch" value="Lunch" />
            <Picker.Item label="Dinner" value="Dinner" />
          </Picker> */}
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
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
          <Button 
          title="Add" 
          onPress={() => this.addMeal()}
          style={styles.addButton}
          />
          <Button title="Show Meals" onPress={() => {this.props.navigation.navigate('Main')}} />
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    marginTop: 20,
    fontSize: 40,
    color: 'blue'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20
  },
  addButton: {
    marginTop: 30
  }
});
