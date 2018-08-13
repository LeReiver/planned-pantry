import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';


export default class SignUp extends React.Component {

  someFunction() {
    console.log('textchange')
  } 
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome To PlannedPantry!</Text>
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
  },
});
