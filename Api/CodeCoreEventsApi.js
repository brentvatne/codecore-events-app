var dispatcher = require('../AppDispatcher');
var { dispatch, handleResponse } = require('flux-util').apiHelpersFor(dispatcher);
var ApiConstants = require('../Constants/ApiConstants');
var AppConstants = require('../Constants/AppConstants');
var ProfileStore = require('../Stores/ProfileStore');

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
    var url = `http://events.codecore.ca/api/events/${eventId}/register`;
    var key = AppConstants.REGISTER_FOR_EVENT;
    var userProfile = ProfileStore.getState();
    var params = {event_id: eventId, attendee: userProfile}

    dispatch(key, ApiConstants.PENDING, params)
    post(url, params).then(handleResponse(key, params))
  },

  fetchEvents(email:?string) {
    var url = `http://events.codecore.ca/api/events`;
    var key = AppConstants.FETCH_EVENTS;
    if (typeof email === 'undefined' || email == null) {
      var email = ProfileStore.getState().email;
    }

    var params = {email: email}

    dispatch(key, ApiConstants.PENDING, params)
    fetch(`${url}?email=${email}`).then(handleResponse(key, params))
  }
}
