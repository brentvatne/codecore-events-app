/**
 * @providesModule EventStore
 * @flow
 */

var createStore = require('flux-util').createStore;
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../Constants/ApiConstants');
var AppConstants = require('../Constants/AppConstants');

var _events = {all: [], registered: []};

var store = createStore({
  setState(events) {
    _events = events;
  },

  getState() {
    return _events;
  },

  dispatcherIndex: dispatcher.register((payload) => {
    var action = payload.action;

    if (action.response === ApiConstants.PENDING) {
      return true;
    }

    switch(action.actionType) {
      case AppConstants.FETCH_EVENTS:
        _events.all = action.response;
        store.emitChange(action);
        break;
      case AppConstants.REGISTER_FOR_EVENT:
         _events.registered.push(action.response)
        store.emitChange(action);
        break;
    }

    return true;
  })
})

module.exports = store;
