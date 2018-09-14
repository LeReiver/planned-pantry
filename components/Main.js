import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Button from 'react-native-button';
import { List, ListItem, Header, Card, Icon } from 'react-native-elements'
import firebase from './Firebase';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      currentUser: null,
      errorMessage: '',
      meal: [] 
    }
    this.getMeals = this.getMeals.bind(this)
  }

  componentDidMount() {
    const that = this;
    this.getMeals(that);
  }

  getMeals(that) {
    const { currentUser } = firebase.auth()
    this.setState( {currentUser} )
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('users/' + user.uid ).child('meal').orderByChild('mealDate').on('value', data => {
          let returnArr = [];

          data.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);
          });
          returnArr.map(meal => {
            return meal
          })
          that.setState({
            meal: returnArr
          })
          return returnArr;

        })
      } else {
        return (<Text> There is no user </Text>)
      }
    });
  }

  signOut() {
    firebase.auth().signOut()
    .then(function() {
      return
    })
    .catch(error => this.setState({ errorMessage: error.message }))
 
  }

  render() {

    const { currentUser } = this.state;
    
    return (
      <View style={styles.container}>
         <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'Planned Pantry', style: { color: '#D6FFBE', fontSize: 40, marginTop: 20 } }}
          outerContainerStyles={{ backgroundColor: '#228765', width: '100%', height: 100}}
          innerContainerStyles={{ justifyContent: 'space-around', height: 50 }}
        />
        <Text style={styles.user}>
         {currentUser && currentUser.email}
        </Text>
        <Text style={styles.title}>
         Your Meals
        </Text> {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <ScrollView style={styles.mealListStyle}>
            {
              this.state.meal.map(meal => {
                return (
                  <Card title={meal.mealDate} key={meal.key} style={styles.mealListTitle}>
                  <View >
                    <Text style={styles.mealListTime}>{meal.mealTime}</Text>
                    <Text style={styles.mealListName}>{meal.mealName}</Text>
                  </View>
                </Card>
                );
              })
            }
        </ScrollView>

        <Button 
          style={styles.addMealButton}
          containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: '#228765', width: '40%', position: 'absolute',left: 30, bottom: 10}}
          title="Add Meal" 
          onPress={() => {this.props.navigation.navigate('AddMeals')}}
        >Add Meal
        </Button>
        <Button 
          style={styles.logoutButton}
          containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: '#228765', width: '40%', position: 'absolute', right: 30, bottom: 10,}}
          title="Logout" 
          onPress={this.signOut} 
        >Logout</Button>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  user: {
    marginTop: 20,
    fontSize: 15,
    color: '#777',
    position: 'absolute',
    left: 2,
    top: 80,
    marginLeft: 0
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
    marginTop: 8
  },
  mealListStyle: {
    marginBottom: 10,
    marginLeft: 0,
    width: '90%',
  },
  mealListTitle: {
    position: 'relative',
    left: 2,
    top: 80,
    marginLeft: 0,
    color: 'blue'
  },
  mealListName: {
    position: 'relative',
    left: 0,
    top: 2,
    marginLeft: 0,
    color: '#77A668',
    fontSize: 25,
  },
  mealListTime: {
    position: 'relative',
    left: 0,
    marginLeft: 0,
    color: '#777',
    fontSize: 20,
  },
  addMealButton: {
    color: '#D6FFBE',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22
  },
  logoutButton: {
    color: '#D6FFBE',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22
  }
});

