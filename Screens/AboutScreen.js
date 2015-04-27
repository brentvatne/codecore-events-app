/**
 * @providesModule AboutScreen
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var AboutScreen = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text>Hi there!</Text>
      </View>
    )
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  }
});

module.exports = AboutScreen;
