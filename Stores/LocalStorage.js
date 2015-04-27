/**
 * @providesModule LocalStorage
 * @flow
 */

var createStore = require('flux-util').createStore;
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../Constants/ApiConstants');
var AppConstants = require('../Constants/AppConstants');
var ProfileStore = require('../Stores/ProfileStore');

var React = require('react-native');
var {
  AsyncStorage,
  AlertIOS,
} = React;

var PREFIX = '@CodeCoreEvents:';
var PROFILE_KEY = PREFIX + 'profile';

var store = createStore({
  bootstrap(complete) {
    AsyncStorage.getItem(PROFILE_KEY, (error, profile) => {
      if (error) {
        console.log('Error getting profile from local storage! ' + error.message);
        AlertIOS.alert('error');
        complete();
      } else {
        ProfileStore.setState(JSON.parse(profile));
        complete();
      }
    })
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    var action = payload.action;

    if (action.response === ApiConstants.PENDING) {
      return true;
    }

    switch(action.actionType) {
      case AppConstants.UPDATE_PROFILE:
        AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(action.data), (error) => {
          if (error) {
            console.log('Error setting profile in local storage! ' + error.message);
          } else {
            store.emitChange(action);
          }
        })
        break;
    }

    return true;
  })
})

module.exports = store;
