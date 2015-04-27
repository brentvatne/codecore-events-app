/**
 * @providesModule HomeScreen
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicatorIOS,
} = React;

var SMXTabBarIOS = require('SMXTabBarIOS');
var SMXTabBarItemIOS = SMXTabBarIOS.Item;

var NavigationBar = require('../Components/NavigationBar');
var UpcomingEventsScreen = require('./UpcomingEventsScreen');
var ProfileScreen = require('./ProfileScreen');
var AppActions = require('../Actions/AppActions');
var EventStore = require('../Stores/EventStore');
var ProfileStore = require('../Stores/ProfileStore');

var HomeScreen = React.createClass({
  getInitialState():any {
    return {
      events: [],
      loading: true,
      registeredEvents: [],
      selected: this.props.selected || 'upcoming-events',
      title: this.props.title || 'Upcoming Events',
    }
  },

  componentWillMount() {
    EventStore.addChangeListener(this.updateEventsFromStore);
    ProfileStore.addChangeListener(this.updateProfileFromStore);
    AppActions.fetchEvents();
    this.updateProfileFromStore();
  },

  componentWillUnmount() {
    EventStore.removeChangeListener(this.updateEventsFromStore);
    ProfileStore.removeChangeListener(this.updateProfileFromStore);
  },

  updateEventsFromStore() {
    var events = EventStore.getState();
    this.setState({events: events.all, registeredEvents: events.registered, loading: false});
  },

  updateProfileFromStore() {
    this.setState({profile: ProfileStore.getState()});
  },

  renderLoading() {
    if (this.state.loading) {
      return (
        <ActivityIndicatorIOS animated={true} size='small' style={{marginTop: 30}} />
      )
    }
  },

  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationBar title={this.state.title} />
        <SMXTabBarIOS>
          <SMXTabBarItemIOS
                  iconName={'ion|ios-calendar-outline'}
                  title={'Events'}
                  selected={this.state.selected === 'upcoming-events'}
                  onPress={() => { this.setState({selected: 'upcoming-events', title: 'Upcoming Events',}) }} >
             <View style={{flex: 1}}>
               {this.renderLoading()}
               <UpcomingEventsScreen events={this.state.events} navigator={this.props.navigator} />
             </View>
          </SMXTabBarItemIOS>

          <SMXTabBarItemIOS
                  iconName={'ion|ios-information-outline'}
                  title={'About'}
                  selected={this.state.selected === 'about'}
                  onPress={() => { this.setState({selected: 'about', title: 'About',}) }} >
            <Text>Stuff goes here</Text>
          </SMXTabBarItemIOS>

          <SMXTabBarItemIOS
                  iconName={'ion|ios-navigate-outline'}
                  title={'Map'}
                  selected={this.state.selected === 'map'}
                  onPress={() => { this.setState({selected: 'map', title: 'Map',}) }} >
            <Text>Map</Text>
          </SMXTabBarItemIOS>

          <SMXTabBarItemIOS
                  iconName={'ion|ios-person-outline'}
                  title={'Profile'}
                  selected={this.state.selected === 'profile'}
                  onPress={() => { this.setState({selected: 'profile', title: 'Profile',}) }} >

            <ProfileScreen profile={this.state.profile} navigator={this.props.navigator} />
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
