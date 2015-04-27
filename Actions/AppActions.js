var dispatcher = require('../AppDispatcher');
var AppConstants = require('../Constants/AppConstants');
var Api = require('../Api/CodeCoreEventsApi');

module.exports = {
  updateProfile(newProfile) {
    dispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_PROFILE,
      data: newProfile,
    });
  },

  registerForEvent(id) {
    Api.registerForEvent(id);
  },

  fetchEvents() {
    Api.fetchEvents();
  },
}
