import Calendar from 'react-native-calendar-datepicker';
import React, { Component } from 'react';
import Moment from 'moment';

export default class DayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    }
  }

  render () {
    return (
      <div className="calendar">
        <Calendar
          onChange={(date) => this.setState({date})}
          selected={this.state.date}
          // We use Moment.js to give the minimum and maximum dates.
          minDate={Moment().startOf('day')}
          maxDate={Moment().add(10, 'years').startOf('day')}
        />


        <View style={{flexDirection: 'row'}}>
          <View style={{flexGrow: 1}}></View>
          <Calendar
            onChange={(date) => this.setState({date})}
            selected={this.state.date}
            //finalStage="month"
            minDate={Moment().startOf('day')}
            maxDate={Moment().add(10, 'years').startOf('day')}
            //General Styling}
            style={{
              borderWidth: 1,
              borderColor: GREY,
              borderRadius: 5,
              alignSelf: 'center',
              marginTop: 20,
            }}
            barView={{
              backgroundColor: BLUE,
              padding: 10,
            }}
            barText={{
              fontWeight: 'bold',
              color: WHITE,
            }}
            stageView={{
              padding: 0,
            }}
            // Day selector styling
            dayHeaderView={{
              backgroundColor: LIGHT_GREY,
              borderBottomColor: GREY,
            }}
            dayHeaderText={{
              fontWeight: 'bold',
              color: BLACK,
            }}
            dayRowView={{
              borderColor: LIGHT_GREY,
              height: 40,
            }}
            dayText={{
              color: BLACK,
            }}
            dayDisabledText={{
              color: GREY,
            }}
            dayTodayText={{
              fontWeight: 'bold',
              color: BLUE,
            }}
            daySelectedText={{
              fontWeight: 'bold',
              backgroundColor: BLUE,
              color: WHITE,
              borderRadius: 15,
              borderColor: "transparent",
              overflow: 'hidden',
            }}
            // Styling month selector.
            monthText={{
              color: BLACK,
              borderColor: BLACK,
            }}
            monthDisabledText={{
              color: GREY,
              borderColor: GREY,
            }}
            monthSelectedText={{
              fontWeight: 'bold',
              backgroundColor: BLUE,
              color: WHITE,
              overflow: 'hidden',
            }}
            // Styling year selector.
            yearMinTintColor={BLUE}
            yearMaxTintColor={GREY}
            yearText={{
              color: BLACK,
            }}
            />
          <View style={{flexGrow: 1}}></View>
        </View>
      </div>
    )
  }
}