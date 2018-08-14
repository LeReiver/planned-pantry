import { React, Component } from 'react'
import firebase from 'firebase';
import MealList from './MealList';

class Meals extends Component{
    constructor(props) {
        super(props);
        this.state = {
            meal: []
        }
    }
    
    componentWillMount() {
        firebase.database().ref('users/').on('value', function(data) {
            this.setState({ meal: data.val() });
        });
    }

    render() {
        return <MealList meal={this.state.meal}/>
    }
}
