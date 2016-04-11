module.exports = function (registerCommand) {
  registerCommand('time', 'time: Get the current time', function (groupLocalID, userDisplayName, msgTokens, originalRequest, callback) {
    callback('The current time is ' + (new Date()).toString());
  });
};
