const msTeamsWinston = require("./index.js");
const { createLogger } = require('winston');
const hookUri = process.env.HOOK_URI;// Set this to the URI of your Microsoft Teams Webhook URI
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

if (!hookUri) {
		console.warn("No process.env.HOOK_URI set. Please set it to your Connector Webhook URI before running this test.");
		process.exit();
}

const logger = createLogger({
	transports: [
		new (msTeamsWinston) (msTeamsWinstonOptions)
	],
	exitOnError: false
});

function runTest() {
		logger.info('MSTeams will render markdown from messages. `Log a block of code` or some *italic text* \n > maybe add a quote block', { title: 'MSTeams supports the use of Markdown in messages.' });
		try {
				throw new Error('TEST');
		} catch (e) {
				logger.error(e.message);
		}
}

runTest();