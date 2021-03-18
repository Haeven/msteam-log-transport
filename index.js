const axios = require('axios').default;
const Transport = require('winston-transport');

module.exports = class MSTeams extends Transport {
	constructor(options) {
		super(options);
			this.options = {
				name: options.name,
				webhook: options.webhook,
				username: options.username,
				summary: options.summary,
				themeColor: options.themeColor,
				sections: options.sections || [],
				potentialAction: options.potentialAction || []
			};

			this.axiosInstance = axios.create();
	}

	log (info, callback) {
		this.options.text = info.message;
		this.axiosInstance.post(this.options.webhook, this.options)
			.then(response => {
				this.emit('logged', info);
				callback();
			})
			.catch(err => {
				this.emit('error', err);
				callback();
			});
		}
}