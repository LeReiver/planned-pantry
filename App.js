import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'


export default class App extends React.Component {

  someFunction() {
    console.log('')
  } 
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Planned Pantry</Text>
        <Text style={styles.desc}>An application that helps users track current food inventory, plan weekly meals, and populates grocery shopping list.</Text>
        <FormLabel style={styles.label}>User Name</FormLabel>
        <FormInput onChangeText={this.someFunction()}/>
        <FormValidationMessage>Required</FormValidationMessage>
        <FormLabel style={styles.label}>Password</FormLabel>
        <FormInput onChangeText={this.someFunction()}/>
        <FormValidationMessage>Required</FormValidationMessage>
        <FormLabel style={styles.label}>Confirm Password</FormLabel>
        <FormInput onChangeText={this.someFunction()}/>
        <FormValidationMessage>Required</FormValidationMessage>
        <Button title='SIGN UP' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: 0,
    color: '#CD4D49',
  },
  desc: {
    width: '90%',
    marginTop: '5%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    fontSize: 18,
  },
});
