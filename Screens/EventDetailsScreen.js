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
  AlertIOS,
  LinkingIOS,
} = React;

var AppActions = require('../Actions/AppActions');
var BlurView = require('react-native-blur').BlurView;
var Overlay = require('react-native-overlay');
var EventStore = require('../Stores/EventStore');
var ActionSheetIOS = require('react-native/Libraries/ActionSheetIOS/ActionSheetIOS');
var Icon = require('FAKIconImage');

var EventDetailsScreen = React.createClass({
  componentWillMount() {
    EventStore.addChangeListener(this.updateEventFromStore);
  },

  componentWillUnmount() {
    EventStore.removeChangeListener(this.updateEventFromStore);
  },

  updateEventFromStore() {
    EventStore.getState().all.forEach((event) => {
      if (event.id == this.state.event.id) {
        this.setState({event: event});
      }
    });
  },

  getInitialState() {
    return {event: this.props.event};
  },

  goBack() {
    this.props.navigator.pop();
  },

  performRegistration() {
    AppActions.registerForEvent(this.props.event.id);
  },

  shareLink() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      message: `Attend ${this.state.event.title} at CodeCore!`,
      url: 'http://events.codecore.ca'
    }, (success) => {}, (failure) => {})
  },

  renderRegistrationButton() {
    if (this.state.event.isRegistered) {
      return (<Text style={styles.actionText}>Registered!</Text>)
    } else {
      return (
        <TouchableOpacity onPress={this.performRegistration}>
          <Text style={styles.actionText}>Register</Text>
        </TouchableOpacity>
      )
    }
  },

  renderTwitterLink() {
    var twitter = this.props.event.twitter;
    if (twitter) {
      return (
        <TouchableOpacity onPress={() => { LinkingIOS.openURL(twitter) }}>
          <View style={styles.socialLink}>
            <Icon name='ion|social-twitter' size={15} color='#00b0ed' style={{width: 15, height: 15, marginRight: 2,}} />
            <Text style={styles.socialLinkText}>Twitter</Text>
          </View>
        </TouchableOpacity>
      )
    }
  },

  renderFacebookLink() {
    var facebook = this.props.event.facebook;
    if (facebook) {
      return (
        <TouchableOpacity onPress={() => { LinkingIOS.openURL(facebook) }}>
          <View style={styles.socialLink}>
            <Icon name='ion|social-facebook' size={15} color='#3b5998' style={{width: 15, height: 15, marginRight: 2,}} />
            <Text style={styles.socialLinkText}>Facebook</Text>
          </View>
        </TouchableOpacity>
      )
    }
  },

  renderLinkedInLink() {
    var linkedin = this.props.event.linkedin;
    if (linkedin) {
      return (
        <TouchableOpacity onPress={() => { LinkingIOS.openURL(linkedin) }}>
          <View style={styles.socialLink}>
            <Icon name='ion|social-linkedin' size={15} color='#006699' style={{width: 15, height: 15, marginRight: 2,}} />
            <Text style={styles.socialLinkText}>LinkedIn</Text>
          </View>
        </TouchableOpacity>
      )
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{uri: this.state.event.splashImageUrl}}
                 style={styles.headerImage}>
            <BlurView blurType="dark" style={styles.header}>
              <Text style={styles.title}>
                {this.state.event.title}
              </Text>
            </BlurView>
          </Image>
        </View>
        <View style={styles.subheader}>
          <Text style={styles.subheaderText}>
            {this.state.event.date}, {this.state.event.time}
          </Text>
        </View>

        <ScrollView style={{flex: 1}}>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              {this.state.event.description}
            </Text>
          </View>
          <View style={styles.presenter}>
            <Image source={{uri: this.state.event.presenterImageUrl}} style={styles.presenterImage} />
            <View style={styles.presenterInformation}>
              <Text style={styles.presenterName}>{this.state.event.presenter}</Text>
              <Text style={styles.presenterBio}>{this.state.event.bio}</Text>
              <View style={styles.socialLinks}>
                {this.renderTwitterLink()}
                {this.renderFacebookLink()}
                {this.renderLinkedInLink()}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.closeButton}>
          <TouchableOpacity onPress={this.goBack}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actions}>
          {this.renderRegistrationButton()}

          <TouchableOpacity onPress={this.shareLink}>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  },
});

var HEADER_HEIGHT = 150;

var styles = StyleSheet.create({
  socialLinkText: {
    fontWeight: '300',
    fontFamily: 'Lato',
    fontSize: 12,
  },
  socialLinks: {
    marginTop: 8,
    flexDirection: 'row',
  },
  socialLink: {
    marginRight: 5,
    flexDirection: 'row',
  },
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
    borderRadius: 3,
    marginTop: 2,
  },
  presenter: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 10,
    marginTop: 10,
    paddingRight: 15,
    marginBottom: 20,
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
    lineHeight: 16,
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
