# msteams-winston
A Winston transport hook to log messages to a Microsoft Teams Webhook connector.

Inspired by [winston-slacker](https://github.com/meerkats/winston-slacker) by [meerkats](https://github.com/meerkats).

## Install

```
$ npm install msteams-winston
```

## Requirements

* [Winston](https://github.com/winstonjs/winston)
* A previously configured MS Teams Webhook is required [Incoming Connector](https://msdn.microsoft.com/en-us/microsoft-teams/connectors). You will need this Webhook URI to configure the **msteams-winston** logger.

## Usage

```js
const { createLogger } = require('winston');
const msTeamsWinston = require("msteams-winston");
const hookUri = 'https://outlook.office.com/webhook/............../...........'
const msTeamsWinstonOptions = {
	"webhook": hookUri,
	"name": "Testing Microsoft Teams Winston",
	"summary": "Test Logger"
};

const logger = createLogger({
	transports: [
		new (msTeamsWinston) (msTeamsWinstonOptions)
	]
});

// This log will be sent to the MS Teams channel configured with the Webhook
logger.info('MSTeams renders markdown in messages. `Log a block of code` or some *italic text* \n > add a quote block');
```

Exhaustive Options:
```js
const msTeamsWinstonOptions = {
	"webhook": hookUri,
	"name": "Testing Microsoft Teams Winston",
	"summary": "Test Logger",
	"themeColor": "cf0808",
	"sections": [{
		"activityTitle": "You can add different sections within your card",
		"activitySubtitle": "Section Subtitle",
		"markdown": true
	}],
	"potentialAction": [{
		"@type": "ActionCard",
		"name": "Click Here To Comment",
		"inputs": [{
			"@type": "TextInput",
			"id": "comment",
			"isMultiline": false,
			"title": "You can set action buttons, like this one that allows you to comment!"
		}],
		"actions": [{
			"@type": "HttpPOST",
			"name": "Add comment",
			"target": "http://...URI TO POST INPUT TO"
		}]
	}, {
		"@type": "ActionCard",
		"name": "Click Here To Input a Date",
		"inputs": [{
			"@type": "DateInput",
			"id": "dueDate",
			"title": "This action allows you to select a date, customize the add a action with a target to post the input"
		}],
		"actions": [{
			"@type": "HttpPOST",
			"name": "Save",
			"target": "http://...URI TO POST INPUT TO"
		}]
	}]
};
```