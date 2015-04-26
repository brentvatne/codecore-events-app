/**
 * @providesModule NavigationBar
 * @flow
 */

'use strict';

var React = require('react-native');
var {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

var NavigationBar = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    height: 65,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#d32f2f',
    flexDirection: 'row',
    paddingTop: 33,
    paddingBottom: 5,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'Lato',
    fontWeight: '400',
    alignSelf: 'center',
  },
})

module.exports = NavigationBar;
