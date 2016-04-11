var config = {};

config.bots = [
  {
    botID: process.env.BOT_ID,
    groupID: process.env.GROUP_ID,
    groupLocalID: process.env.GROUP_LOCAL_ID, // an identifier for this group used in this application only
    botName: process.env.BOT_NAME,
    groupName: process.env.GROUP_NAME // optional
  }
];

config.creds_json = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY
};

config.spreadsheet_key = process.env.GOOGLE_SPREADSHEET_KEY;

config.yahooWeatherAppId = process.env.YAHOO_WEATHER_APP_API_ID;

config.travisUserToken = process.env.TRAVIS_CI_USER_TOKEN;

module.exports = config;
