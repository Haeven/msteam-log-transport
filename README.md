<h1 align="center">MS Teams Winston Adapter</h1>
  <p align = "center">
    <a href = 'https://code.visualstudio.com/'>
        <img alt ='Visual Studio Code' src='https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg'/>
    </a>
    <a href="https://github.com/Haeven/msteams-winston" target="_blank">
        <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
    </a>
    <a href="https://github.com/Haeven/msteams-winston/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/License-MIT-brightgreen.svg">
    </a>
    <a href="https://twitter.com/hvndevs" target="_blank">
        <img alt="Twitter: Haeven" src="https://img.shields.io/twitter/follow/hvndevs.svg?style=social" />
    </a>
</p>

# Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Requirements](#Requirements)
- [About info](#Author-info)
- [Contribution](#contribution)
- [Support](#show-your-support)
- [License](#license)

# Description

> A Winston transport hook to log messages to a Microsoft Teams Webhook connector.

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

# Author info

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Haeven)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/Haeven)
[![Twitter](https://img.shields.io/badge/hvndevs-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/hvndevs)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:haevendevs@gmail.com)

# Show your support

Give a ⭐️ star if this project helped you!

# License

Copyright © 2023 [Haeven Dickerson](https://github.com/Haeven).<br />
This project is [MIT](https://github.com/Haeven/msteams-winston/blob/main/LICENSE) licensed.

---

<div align = "center"><img src="https://madewithlove.now.sh/in?heart=true&colorA=%23505050&colorB=%235032b4&template=for-the-badge&text=Illinois" alt="Made with love in Illinois"></div>
