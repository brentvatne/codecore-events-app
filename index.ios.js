/**
 * @providesModule CodeCoreEvents
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  StatusBarIOS,
  AlertIOS,
} = React;

var AppActions = require('./Actions/AppActions');
var EventStore = require('./Stores/EventStore');
var HomeScreen = require('./Screens/HomeScreen');
var EventDetailsScreen = require('./Screens/EventDetailsScreen');
var LocalStorage = require('./Stores/LocalStorage');

var CodeCoreEvents = React.createClass({
  getInitialState() {
    return {bootstrapped: false}
  },

  componentWillMount() {
    LocalStorage.bootstrap(() => this.setState({bootstrapped: true}));
  },

  renderScene(route, nav) {
    switch (route.id) {
      case 'upcoming-events':
        return <HomeScreen selected={route.id} navigator={nav} />;
      case 'event-details':
        return <EventDetailsScreen event={route.event} navigator={nav} />;
      default:
        return <View />;
    }
  },

  onWillFocus(route) {
    switch (route.id) {
      case 'upcoming-events':
        StatusBarIOS.setHidden(false, 0);
        StatusBarIOS.setStyle(1, true);
      case 'event-details':
        if (route.event) {
          StatusBarIOS.setHidden(true, 0);
        }
    }
  },

  configureScene(route) {
    return Navigator.SceneConfigs.FloatFromBottom;
  },

  render() {
    var DEFAULT_ROUTE = {id: 'upcoming-events', };

    if (this.state.bootstrapped == false) {
      return <View />;
    }

    return (
      <Navigator
        initialRoute={DEFAULT_ROUTE}
        renderScene={this.renderScene}
        onWillFocus={this.onWillFocus}
        configureScene={this.configureScene} />
    );
  }
});

var styles = StyleSheet.create({
});

AppRegistry.registerComponent('CodeCoreEvents', () => CodeCoreEvents);
