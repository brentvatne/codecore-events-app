/**
 * @providesModule ProfileScreen
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
} = React;

var AppActions = require('../Actions/AppActions');
var TimerMixin = require('react-timer-mixin');

var t = require('tcomb-form-native');
var Form = t.form.Form;
Form.stylesheet = require('./FormStylesheet');

var options = {
  fields: {
    name: {
      autoCorrect: false,
      bufferDelay: 500,
    },
    email: {
      autoCorrect: false,
      bufferDelay: 500,
    },
    company: {
      autoCorrect: false,
      bufferDelay: 500,
    }
  }
};

var Person = t.struct({
  name: t.Str,
  email: t.Str,
  company: t.maybe(t.Str),
});

var ProfileScreen = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {buttonText: 'Save'};
  },

  submitForm() {
    var value = this.refs.form.getValue();

    if (value == null) {
      // Invalid!
    } else {
      AppActions.updateProfile(value);
      this.setState({buttonText: 'Updated!'});
      this.setTimeout(() => { this.setState({buttonText: 'Save'}) }, 3000);
    }
  },

  render() {
    return (
      <ScrollView style={{flex: 1, padding: 20,}}>
        <Form ref="form" type={Person} value={this.props.profile} options={options} />
        <TouchableOpacity onPress={this.submitForm}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{this.state.buttonText}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  },
});

var styles = StyleSheet.create({
  button: {
    padding: 15,
    flex: 1,
    backgroundColor: '#BA6262',
    borderRadius: 3,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Lato',
  },
});


module.exports = ProfileScreen;
