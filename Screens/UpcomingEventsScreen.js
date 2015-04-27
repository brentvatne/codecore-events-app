/**
 * @providesModule UpcomingEventsScreen
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} = React;

var NavigationBar = require('../Components/NavigationBar');
var Icon = require('FAKIconImage');

var UpcomingEventsScreen = React.createClass({
  showEventDetails(event:any) {
    this.props.navigator.push({id: 'event-details', event: event});
  },

  renderRegistration(event:any) {
    if (event.isRegistered) {
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={[styles.smallText, styles.registered]}>Registered</Text>
          <Icon name='ion|ios-checkmark-empty' size={15} style={{width: 15, height: 13}} color="green" />
        </View>
      );
    } else {
      return (
        <Text style={[styles.smallText, styles.remaining]}>
          {event.remaining} spots remaining
        </Text>
      );
    }
  },

  renderEvent(event:any) {
    return (
      <TouchableHighlight underlayColor="#FFE5E5" onPress={() => { this.showEventDetails(event) }} key={event.id}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.date}>{event.date} at {event.time}</Text>
          </View>
          <Text style={styles.title}>{event.title}</Text>
          <View style={styles.footer}>
            {this.renderRegistration(event)}
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        {this.props.events.map((event) => { return this.renderEvent(event) })}
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
    paddingTop: 2,
    paddingBottom: 3,
    paddingRight: 15,
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
  registered: {
    color: 'green'
  }
})

module.exports = UpcomingEventsScreen;
