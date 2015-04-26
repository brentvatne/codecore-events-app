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
} = React;

var HomeScreen = require('./Screens/HomeScreen');

var CodeCoreEvents = React.createClass({
  getInitialState() {
    return {bootstrapped: false}
  },

  componentWillMount() {
    this.setState({bootstrapped: true});
    // LocalStorage.bootstrap(() => this.setState({bootstrapped: true}));
  },

  renderScene(route, nav) {
    switch (route.id) {
      case 'upcoming-events':
        return <HomeScreen selected={route.id} navigator={nav} />;
      case 'user-info':
        return <Text>User Info</Text>
      default:
        return <View />;
    }
  },

  render() {
    if (this.state.bootstrapped == false) {
      return <View />;
    }

    return (
      <Navigator
        initialRoute={{id: 'upcoming-events', }}
        renderScene={this.renderScene} />
    );
  }
});

var styles = StyleSheet.create({
});

AppRegistry.registerComponent('CodeCoreEvents', () => CodeCoreEvents);
