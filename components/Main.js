import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
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
    // this.mealDate = this.mealDate.bind(this)
    // this.mealName = this.mealName.bind(this)
    // this.mealTime = this.mealTime.bind(this)
    
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

  removeMeal(user) {
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
          // leftComponent={<MyCustomLeftComponent />}
          centerComponent={{ text: 'Planned Pantry', style: { color: '#3c9' } }}
          outerContainerStyles={{ backgroundColor: '#3D6DCC', width: '100%'}}
          innerContainerStyles={{ justifyContent: 'space-around' }}
        />
        <Text>
          Welcome {currentUser && currentUser.email}!
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
            />
            ))
          }
          {/* <ListView
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}
          /> */}
        </List> 
        </ScrollView>
        <Button title="Add Meal" onPress={() => {this.props.navigation.navigate('Meals')}} />
        <Button title="Logout" onPress={this.signOut} />
        {/* <Button title="Remove Meal" onPress={this.removeMeal} /> */}

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
  }
});

