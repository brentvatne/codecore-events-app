/**
 * @providesModule EventDetailsScreen
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} = React;

var BlurView = require('react-native-blur').BlurView;
var Overlay = require('react-native-overlay');

var EventDetailsScreen = React.createClass({

  getInitialState() {
    return {};
  },

  goBack() {
    this.props.navigator.pop();
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{uri: this.props.event.splashImageUrl}}
                 style={styles.headerImage}>
            <BlurView blurType="dark" style={styles.header}>
              <Text style={styles.title}>
                {this.props.event.title}
              </Text>
            </BlurView>
          </Image>
        </View>
        <View style={styles.subheader}>
          <Text style={styles.subheaderText}>
            {this.props.event.date}, {this.props.event.time}
          </Text>
        </View>

        <ScrollView style={{flex: 1}}>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              {this.props.event.description}
            </Text>
          </View>
          <View style={styles.presenter}>
            <Image source={{uri: this.props.event.presenterImageUrl}} style={styles.presenterImage} />
            <View style={styles.presenterInformation}>
              <Text style={styles.presenterName}>{this.props.event.presenter}</Text>
              <Text style={styles.presenterBio}>{this.props.event.bio}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.closeButton}>
          <TouchableOpacity onPress={this.goBack}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity>
            <Text style={styles.actionText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  },
});

var HEADER_HEIGHT = 150;

var styles = StyleSheet.create({
  actions: {
    height: 50,
    padding: 5,
    backgroundColor: '#F6F6F6',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionText: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: '300',
    color: '#BA6262',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    backgroundColor: 'transparent',
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 16,
  },
  presenterImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    marginTop: 2,
  },
  presenter: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    marginTop: 10,
    paddingRight: 15,
  },
  presenterInformation: {
    flex: 1,
    paddingLeft: 8,
  },
  presenterName: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  presenterBio: {
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: '300',
  },
  subheader: {
    padding: 10,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
  },
  subheaderText: {
    fontFamily: 'Lato',
    fontWeight: '300',
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: HEADER_HEIGHT,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  headerImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    paddingRight: 40,
    fontFamily: 'Lato',
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    padding: 10,
    paddingTop: 5,
  },
  descriptionText: {
    fontFamily: 'Lato',
    fontWeight: '300',
    lineHeight: 23,
  },
})

module.exports = EventDetailsScreen;
