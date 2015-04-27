/**
 * @providesModule ProfileStore
 * @flow
 */

var createStore = require('flux-util').createStore;
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../Constants/ApiConstants');
var AppConstants = require('../Constants/AppConstants');

var _profile = {};

var store = createStore({
  setState(profile) {
    _profile = profile;
  },

  getState() {
    return _profile;
  },

  dispatcherIndex: dispatcher.register((payload) => {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.UPDATE_PROFILE:
        _profile = action.data;
        console.log('updated!');
        store.emitChange(action);
        break;
    }

    return true;
  })
})

module.exports = store;
