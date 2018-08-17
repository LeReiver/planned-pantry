import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Header } from 'react-native-elements'
import firebase from 'firebase';


export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
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
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
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
    marginTop: 18
  },
})