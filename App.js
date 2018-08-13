import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'


export default class App extends React.Component {

  someFunction() {
    console.log('textchange')
  } 
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome To PlannedPantry!</Text>
        <Text style={styles.desc}>An application that helps users track current food inventory, plan weekly meals, and populates grocery shopping list.</Text>
        <FormLabel>User Name</FormLabel>
        {/* <FormInput onChangeText={this.someFunction()}/> */}
        <FormValidationMessage>Required</FormValidationMessage>
        <FormLabel>Password</FormLabel>
        {/* <FormInput onChangeText={this.someFunction()}/> */}
        <FormValidationMessage>Required</FormValidationMessage>
        <FormLabel>Confirm Password</FormLabel>
        {/* <FormInput onChangeText={this.someFunction()}/> */}
        <FormValidationMessage>Required</FormValidationMessage>
        <Button title='SIGN UP' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: 0,
  },
  desc: {
    width: '80%',
    marginHorizontal: '10%',
    marginTop: '5%',
    backgroundColor: '#ddd',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    fontSize: 20,
  },
});
