/**
 * @providesModule MapScreen
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
  MapView,
} = React;

var CodeCorePos = {
  latitude: 49.2821585,
  longitude: -123.1086794,
  latitudeDelta: 0.007,
  longitudeDelta: 0.007,
}

var Annotations = [
  {latitude: CodeCorePos.latitude,
   longitude: CodeCorePos.longitude,
   title: 'CodeCore - 142 W Hastings Street',}
]

var MapScreen = React.createClass({
  render() {
    return (
      <MapView style={styles.map} region={CodeCorePos} annotations={Annotations} />
    );
  }
});

var styles = StyleSheet.create({
  map: {
    flex: 1,
  }
});

module.exports = MapScreen;
