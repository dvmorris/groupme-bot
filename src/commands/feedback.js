async = require("async");
var GoogleSpreadsheet = require("google-spreadsheet");


// spreadsheet key is the long id in the sheets URL
var creds_json = require('../config').creds_json;
var spreadsheet_key = require('../config').spreadsheet_key;
var doc = new GoogleSpreadsheet(spreadsheet_key);
var sheet;

var addFeedbackRow = function (groupLocalId, userDisplayName, message, callback) {
  async.series([
    function setAuth(step) {
      doc.useServiceAccountAuth(creds_json, step);
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        console.log('Loaded doc: '+info.title+' by '+info.author.email);
        sheet = info.worksheets[1];
        console.log('sheet 2: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
        step();
      });
    },
    function workingWithRows(step) {
      // google provides some query options
      doc.addRow(sheet.id, {
        "group_id": groupLocalId,
        "user_name": userDisplayName,
        "created_at": Date.now()/1000,
        "text": message
      }, function( err ){
        console.log('Added row');
        step();
      });
    },
    function finish(step) {
      step['status'] = 'success';
      callback(step);
    }
  ]);
};



module.exports = function (registerCommand) {
  registerCommand(
    'feedback',
    'feedback <text>: Provide feedback about your most recent shift',
    function (groupLocalID, userDisplayName, msgTokens, callback) {
      var text = msgTokens[0];
      if (text) {
        addFeedbackRow(groupLocalID, userDisplayName, text, function (data) {
          if (data.status == 'success') {
            callback('Thank you, your feedback has been recorded.');
          } else {
            callback('Cannot process your feedback at this time. Please try again later.');
          }
        });
      } else {
        callback('Please provide feedback text in the form of a number between 1 and 10, or a sentence.');
      }
    }
  );
};
