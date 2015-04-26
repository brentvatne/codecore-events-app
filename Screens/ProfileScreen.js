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

var t = require('tcomb-form-native');
var Form = t.form.Form;
Form.stylesheet = require('./FormStylesheet');

var options = {};

var Person = t.struct({
  name: t.Str,
  email: t.Str,
  company: t.maybe(t.Str),
});

var ProfileScreen = React.createClass({
  submitForm() {
    var value = this.refs.form.getValue();

    if (value) {
      console.log(value);
    } else {
      // ..
    }
  },

  render() {
    return (
      <ScrollView style={{flex: 1, padding: 20,}}>
        <Form ref="form" type={Person} options={options} />
        <TouchableOpacity onPress={this.submitForm}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
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
