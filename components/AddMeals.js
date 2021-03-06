import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { Header } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import Moment from 'moment';
import firebase from './Firebase';
import DatePicker from 'react-native-datepicker';

export default class AddMeals extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            errorMessage: '',
            mealName: '',
            mealTime: '',
            date: '',
            // selectedStartDate: null,
        }
        this.onDateChange = this.onDateChange.bind(this);
    }

    
    
    onDateChange(date) {
      this.setState({
        date: date,
      });
    }

    // getDate() {
    //   return (
    //     <DatePicker
    //       style={{width: 200}}
    //       date={this.state.date}
    //       mode="date"
    //       placeholder="select date"
    //       format="YYYY-MM-DD"
    //       minDate="2018-08-01"
    //       maxDate="2028-06-01"
    //       confirmBtnText="Confirm"
    //       cancelBtnText="Cancel"
    //       customStyles={{
    //         dateIcon: {
    //           position: 'absolute',
    //           left: 0,
    //           top: 4,
    //           marginLeft: 0
    //         },
    //         dateInput: {
    //           marginLeft: 36,
    //           width: 30
    //         }
    //       }}
    //       onDateChange={(date) => {this.setState({date: date})}}
    //     />
    //   )
    // }

    addMeal() {
      let mealName = this.state.mealName;
      let mealTime = this.state.mealTime;

      const { date } = this.state;
      const mealDate = date ? date.toString() : '';

      const userId = firebase.auth().currentUser.uid;
      if (mealName === '') {
        this.setState({ errorMessage: 'Please enter a meal name' })
        return
      }
      if (mealTime === '') {
        this.setState({ errorMessage: 'Please enter a meal time' })
        return
      }
      firebase.database().ref('users/' + userId + '/meal').push(
          {
            mealName: mealName,
            mealTime: mealTime,
            mealDate: mealDate
        })
        .then(() => {
          this.props.navigation.navigate('Main')
          })
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    signOut() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('you have logged out')
      }).catch(function(error) {
        // An error happened.
        console.log('error logging out')
      });
    }

    render() {

      const { date } = this.state;
      const myDate = date ? date.toString() : '';
      // console.log(myDate)
      const day = myDate.split(' ')[0]+ ' ';
      const month = myDate.split(' ')[1]+ ' ';
      const thisDate =  myDate.split(' ')[2] + ' ';
      const thisYear =  myDate.split(' ')[3] + ' ';
      const selectedDate = day.concat(month).concat(thisDate).concat(thisYear);

        return (
          <View style={styles.container}>
          <Header
            statusBarProps={{ barStyle: 'light-content' }}
            centerComponent={{ text: 'Planned Pantry', style: { color: '#D6FFBE', fontSize: 20, marginTop: 15, position: 'absolute', left: 15, top: 0 } }}
            outerContainerStyles={{ backgroundColor: '#228765', width: '100%', height: 60}}
            // innerContainerStyles={{ justifyContent: 'space-around', height: 20 }}
          />
            {/* <Text style={styles.title}>Add A Meal</Text> */}
            <Button 
            title="Add" 
            onPress={() => this.addMeal()}
            style={styles.addButton}
            containerStyle={{padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#228765', width: '60%', justifyContent: 'center', marginTop: 10, alignItems: 'center'}}
          >Add Meal
          </Button>
            {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
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

        {/*           
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
          /> */}

          {/* <View style={styles.container}>
            <View>
              <Text style={styles.dateText}>
                {this.state.date ?
                this.state.date.format('DD-MM-YYYY h:mm a') :
                "No date selected"}
              </Text>
            </View> */}

            <View style={styles.calendar}> <View>
                <Text style={styles.selectedDate}>SELECTED DATE:  {selectedDate}</Text>
              </View>
              <CalendarPicker
                onDateChange={this.onDateChange}
              />
             {console.log(selectedDate)}
             
            </View>
          {/* </View> */}



            <Button 
            style={styles.goToMealButton}
            containerStyle={{padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#228765', width: '40%', position: 'absolute',left: 30, bottom: 10}}
            title="Add Meal" 
            onPress={() => {this.props.navigation.navigate('Main')}}
          >Meals
          </Button>
          <Button 
            style={styles.logoutButton}
            containerStyle={{padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#228765', width: '40%', position: 'absolute', right: 30, bottom: 10,}}
            title="Logout" 
            onPress={this.signOut} 
            >Logout
          </Button>
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
    fontSize: 30,
    color: '#228765'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20
  },
  selectedDate: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 0,
    color: 'green'
  },
  calendar: {
    marginTop: 30,
    marginBottom: 30
  },
  addButton: {
    color: '#D6FFBE',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15
  },
  goToMealButton: {
    color: '#D6FFBE',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15
  },
  logoutButton: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15
  }
});
