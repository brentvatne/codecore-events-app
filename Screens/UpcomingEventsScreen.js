/**
 * @providesModule UpcomingEventsScreen
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

var NavigationBar = require('../Components/NavigationBar');
var Icon = require('FAKIconImage');

var EVENTS = require('./Events');

var UpcomingEventsScreen = React.createClass({

  getInitialState() {
    return {events: EVENTS};
  },

  renderEvent(event:any) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.date}>{event.date} at {event.time}</Text>
        </View>
        <Text style={styles.title}>{event.title.toUpperCase()}</Text>
        <View style={styles.footer}>
          <Text style={[styles.smallText, styles.remaining]}>{event.remaining} spots remaining</Text>
        </View>
      </View>
    );
  },

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        {this.state.events.map((event) => { return this.renderEvent(event) })}
      </ScrollView>
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
    fontSize: 12,
  },
  title: {
    paddingTop: 3,
    paddingBottom: 3,
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

module.exports = UpcomingEventsScreen;
