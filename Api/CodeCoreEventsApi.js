var dispatcher = require('../AppDispatcher');
var { dispatch, handleResponse } = require('flux-util').apiHelpersFor(dispatcher);
var ApiConstants = require('../Constants/ApiConstants');
var AppConstants = require('../Constants/AppConstants');

var post = (url, body) => {
  return fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
};

module.exports = {
  registerForEvent(eventId) {
    var url = `http://events.codecore.ca/api/events/${eventId}/registerld/`;
    var key = AppConstants.REGISTER_FOR_EVENT;
    var userProfile = ProfileStore.getState();
    var params = {eventId: eventId, attendee: userProfile}

    dispatch(key, ApiConstants.PENDING, params)
    post(url).then(handleResponse(key, params))
  },

  fetchEvents() {
    var url = `http://events.codecore.ca/api/events`;
    var key = AppConstants.FETCH_EVENTS;
    var params = {}

    dispatch(key, ApiConstants.PENDING, params)
    fetch(url).then(handleResponse(key, params))
  }
}
