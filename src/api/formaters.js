export const formatContain = (filters, keys) => { 
	let formated = {};
	
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];

		if (filters[key] != '') {
			formated = Object.assign(formated, {
				[key]: {
					contain: filters[key]
				}
			});
		}
	}

	return formated;
};

export const formatWhereHas = (filters, keys, { field, where, subField = 'id' }) => {
	let formatted = {};
	
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];

		if (filters[key.state].length > 0) {
			let values = filters[key.state].map(row => row[subField]);
			formatted = Object.assign(formatted, {
				[key.entity]: {
					[field]: {
						[where]: values
					}
				}
			});
		}
	}

	if (Object.values(formatted).length == 0) return {};

	return {
		whereHas: formatted
	};
};
export const formatArray = (filters, keys, { field, where, subField = 'id' }) => {
	let formatted = {};
	
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];

		if (filters[key.state].length > 0) {
			let values = filters[key.state];
			formatted = Object.assign(formatted, {
				[key.entity]: {
					[field]: {
						[where]: values
					}
				}
			});
		}
	}

	if (Object.values(formatted).length == 0) return {};

	return {
		whereHas: formatted
	};
}