

class MealList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2
          }),
      }
  }

  getDataSource(meal: Array<any>): ListView.DataSource {
      if(!meal) return;
      return this.state.dataSource.cloneWithRows(meal);
  }

  componentDidMount() {
      this.setState({dataSource: this.getDataSource(this.props.meal)});
  }

  componentWillReceiveProps(props) {
      this.setState({dataSource: this.getDataSource(props.meal)});
  }

  renderRow = (meal) => {
      return (
          <View>
              <Text>{meal.mealTitle}</Text>
              <Text>{meal.mealDate}</Text>
              <Text>{meal.mealName}</Text>
          </View>
      );
  }

  render() {
      return(
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              enableEmptySections={true}
          />
      );
  }
}