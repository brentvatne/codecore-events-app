/**
 * @providesModule HomeScreen
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} = React;

var SMXTabBarIOS = require('SMXTabBarIOS');
var SMXTabBarItemIOS = SMXTabBarIOS.Item;

var NavigationBar = require('../Components/NavigationBar');
var UpcomingEventsScreen = require('./UpcomingEventsScreen');

var HomeScreen = React.createClass({
  getInitialState() {
    return {
      selected: this.props.selected || 'upcoming-events'
    }
  },

  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationBar title="Upcoming Events" />
        <SMXTabBarIOS>
          <SMXTabBarItemIOS
                  iconName={'ion|ios-calendar-outline'}
                  title={'Events'}
                  selected={this.state.selected === 'upcoming-events'}
                  onPress={() => { this.setState({selected: 'upcoming-events'}) }} >
            <UpcomingEventsScreen navigator={this.props.navigator} />
          </SMXTabBarItemIOS>

          <SMXTabBarItemIOS
                  iconName={'ion|ios-star-outline'}
                  title={'My Schedule'}
                  selected={this.state.selected === 'my-schedule'}
                  onPress={() => { this.setState({selected: 'my-schedule'}) }} >
            <Text>My Schedule</Text>
          </SMXTabBarItemIOS>

          <SMXTabBarItemIOS
                  iconName={'ion|ios-navigate-outline'}
                  title={'Map'}
                  selected={this.state.selected === 'map'}
                  onPress={() => { this.setState({selected: 'map'}) }} >
            <Text>Map</Text>
          </SMXTabBarItemIOS>

          <SMXTabBarItemIOS
                  iconName={'ion|ios-person-outline'}
                  title={'Profile'}
                  selected={this.state.selected === 'profile'}
                  onPress={() => { this.setState({selected: 'profile'}) }} >
            <Text>Profile</Text>
          </SMXTabBarItemIOS>
        </SMXTabBarIOS>
      </View>
    )
  },
});


var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  wrapper: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
  },
  date: {
    color: "#B4AEAE",
    fontFamily: 'Lato',
    fontSize: 13,
  },
  title: {
    paddingTop: 3,
    paddingBottom: 4,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    fontSize: 16,
  },
  smallText: {
    fontSize: 11,
    fontFamily: 'Lato',
  },
  remaining: {
    color: "#666666",
  },
})

module.exports = HomeScreen;
