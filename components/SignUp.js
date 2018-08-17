import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Header } from 'react-native-elements'
import firebase from 'firebase';

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }
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
        centerComponent={{ text: 'Planned Pantry', style: { color: '#3c9', fontSize: 30, marginTop: 20 } }}
        outerContainerStyles={{ backgroundColor: '#3D6DCC', width: '100%', height: 100}}
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
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
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
    fontSize: 40,
    color: 'blue'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 18
  },
});
