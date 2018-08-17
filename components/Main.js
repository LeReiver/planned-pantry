import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Button from 'react-native-button';
import { List, ListItem, Header } from 'react-native-elements'
import firebase from 'firebase';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      currentUser: null,
      meal: [] 
    }

    this.getMeals = this.getMeals.bind(this)
    
  }

  componentDidMount() {
    const that = this;
    this.getMeals(that);
  }

  componentWillUnMount() {
    this.getMeals();
  }

  getMeals(that) {
    const { currentUser } = firebase.auth()
    this.setState( {currentUser} )
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('users/' + user.uid ).child('meal').on('value', data => {
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

  removeMeal() {
    console.log('Removing meal')
    firebase.database().ref('users')
    .child('user')
    .child('meal')
    .child('mealName')
    .remove();
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('you have logged out')
    }).catch(function(error) {
      // An error happened.
    });
  }

  // renderRow (rowData, sectionId) {
  //   return (
  //     this.state.meal.map(meal => (
  //       // console.log(meal.mealName)
  //     <ListItem
  //       style={styles.mealListStyle}
  //       key={sectionId}
  //       mealDate={rowData.meal.mealDate}
  //       mealName={rowData.meal.mealName}
  //       mealTime={rowData.meal.mealTime}
  //     />
  //     ))
    
  //   )
  // }

  render() {

    const { currentUser } = this.state;
    
    return (
      <View style={styles.container}>
         <Header
          statusBarProps={{ barStyle: 'light-content' }}
          centerComponent={{ text: 'Planned Pantry', style: { color: 'white', fontSize: 40, marginTop: 20 } }}
          outerContainerStyles={{ backgroundColor: '#3D6DCC', width: '100%', height: 100}}
          innerContainerStyles={{ justifyContent: 'space-around', height: 50 }}
        />
        <Text style={styles.user}>
         {currentUser && currentUser.email}
        </Text>
        <Text style={styles.title}>
         Your Meals
        </Text>
        <ScrollView>
        <List containerStyle={{margin: 20,width: 250}}> 
          {console.log('render', this.state.meal)}
            {this.state.meal.map(meal => (
              // console.log(meal.mealName)
            <ListItem
              style={styles.mealListStyle}
              key={meal.key}
              mealDate={meal.mealDate}
              mealName={meal.mealName}
              mealTime={meal.mealTime}
            // button={<Button title="-" onPress={this.removeMeal} />} 
            />
            ))
          }
          {/* <ListView
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}
          /> */}
        </List> 
        </ScrollView>

        <Button 
          style={styles.addMealButton}
          containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: '#3D6DCC', width: '40%', position: 'absolute',left: 30, bottom: 10}}
          title="Add Meal" 
          onPress={() => {this.props.navigation.navigate('AddMeals')}}
        >Add Meal
        </Button>
        <Button 
          style={styles.logoutButton}
          containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: '#3D6DCC', width: '40%', position: 'absolute', right: 30, bottom: 10,}}
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
    color: 'blue',
    position: 'absolute',
    left: 2,
    top: 80,
    marginLeft: 0
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    color: 'blue'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  mealListStyle: {
    height: 100,
    marginBottom: 10,
    marginLeft: 0
  },
  addMealButton: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22
  },
  logoutButton: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22
  }
});

