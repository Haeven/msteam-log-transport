const request = require('request');
const util = require('util');
const winston = require('winston');

/**
 * Default formatting for messages sent to MSTeams
 * @param {string} Logging level
 * @param {string} Message to send to MSTeams
 */
function defaultFormatter(level, message) {
	return ['[', level, ']', ' ', message].join('');
  }

/**
 * MSTeams integration for Winston
 * @param {object} Options parameter
 */
function MSTeams(options) {
  if (!options.webhook || typeof options.webhook !== 'string') {
    throw new Error('Invalid webhook parameter');
  }

  this.name = options.name;
  this.webhook = options.webhook;
  this.options = {
    webhook: options.webhook,
    username: options.username,
    summary: options.summary,
    themeColor: options.themeColor,
    sections: options.sections || [],
    potentialAction: options.potentialAction || []
  };
}

/**
 * Handles the sending of a message to an Incoming webhook
 * @param {text} Message text
 * @param {function} Callback function for post execution
 */
function send(message, callback) {
  if (!message) {
    return callback(new Error('No message'));
  }

  this.options.text = message;
  const requestParams = {
    url: this.webhook,
    body: this.options,
    json: true
  };

  return request.post(requestParams, (err, res, body) => {
      return (err || body !== 'ok') ? callback(err || new Error(body)) : callback(null, body));
}

util.inherits(MSTeams, winston.Transport);
winston.transports.MSTeams = MSTeams;

/**
 * Log method for Winston integration
 * @param {string} Logging level
 * @param {string} Message to send to MSTeams
 * @param {string} Meta data for styling
 * @param {function} Callback function for post execution
 */
MSTeams.prototype.log = (level, message, meta, callback) => {
  return send.call(this, defaultFormatter(level, message, meta), callback);
};

module.exports = MSTeams;
