import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { Header } from 'react-native-elements';
import firebase from './Firebase';


export default class Login extends React.Component {
  state = { 
    email: '', 
    password: '', 
    errorMessage: null
  }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
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
        <Text style={styles.desc}>Plan and log your weekly meals.</Text>
        <Text style={styles.desc}>Create meals with meal times.</Text>
        <Text style={styles.desc}>Add them to your calendar.</Text>
        <Text style={styles.title}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button 
          onPress={this.handleLogin}
          style={styles.signUpButton}
          containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: '#228765', width: '60%', justifyContent: 'center', marginTop: 10, marginBottom: 10, alignItems: 'center'}}
        >Login</Button>
        <Text >Don't have an account yet?</Text>
        <Button 
          onPress={() => this.props.navigation.navigate('SignUp')}
          style={styles.signUpButton}
          containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: '#228765', width: '60%', justifyContent: 'center', marginTop: 10, alignItems: 'center'}}
        >Go To Sign Up</Button>

        <Text style={styles.testAccount}>Need a test account?</Text>
        <Text style={styles.testAccount}>email: test-user@mail.com | password: test-user</Text>
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
    fontSize: 20,
    color: '#228765'
  },
  desc: {
    marginTop: 12,
    fontSize: 20,
    color: 'black',
    alignItems: 'flex-start',
    lineHeight: 20
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
    marginTop: 2
  },
  testAccount: {
    marginTop: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 12
  }
});