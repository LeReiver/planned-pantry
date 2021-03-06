import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { Header } from 'react-native-elements'
import firebase from './Firebase';

export default class SignUp extends React.Component {
  state = { 
    email: '', 
    password: '', 
    errorMessage: null
  }

  handleSignUp = () => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.navigation.navigate('Main'))
    .catch(error => this.setState({ errorMessage: error.message }))
  }

render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'Planned Pantry', style: { color: '#D6FFBE', fontSize: 40, marginTop: 20 } }}
          outerContainerStyles={{ backgroundColor: '#228765', width: '100%', height: 100}}
          innerContainerStyles={{ justifyContent: 'space-around', height: 50 }}
        />
        <Text style={styles.title}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button 
          onPress={this.handleSignUp}
          style={styles.signUpButton}
          containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: '#228765', width: '60%', justifyContent: 'center', marginTop: 10, marginBottom: 10, alignItems: 'center'}}
        >Sign Up</Button>
        <Text >Already have an account?</Text>
        <Button 
          title="Add" 
          onPress={this.handleSignUp}
          style={styles.signUpButton}
          onPress={() => this.props.navigation.navigate('Login')}
          containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: '#228765', width: '60%', justifyContent: 'center', marginTop: 10, alignItems: 'center'}}
        >Go To Login</Button>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    color: '#228765'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 18
  },
  signUpButton: {
    color: '#D6FFBE',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22
  },
  loginLink: {
    marginTop: 260
  }
});
