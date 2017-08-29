const getters = {
    hasFilters ({ FILTER }) {
        return Object.values(FILTER).filter(row => row != '' && row != []).length > 0;
    },
    getItems ({ ITEMS }) {
    	return ITEMS;
    },
    pagination ({ page, perPage, total, last }) {
    	return {
    		page,
    		perPage,
    		total,
    		last
    	};
    },
    getItem ({ ITEM }) {
        return ITEM;
    },
    setNewItem ({ NEW_ITEM }) {
        return NEW_ITEM;
    },
    getStatus ({ STATUSES }) {
        return STATUSES;
    },
    getCurrency ({ CURRENCY }) {
        return CURRENCY;
    },
    totalItems({ total }) {
        return total
    },
    getStatuses ({ FILTER }) {
        return FILTER.statuses;
    },
    getCurrencys ({ FILTER }) {
        return FILTER.currencys;
    },
    getId ({ FILTER }) {
        return FILTER.id;
    },
    getName ({ FILTER }) {
        return FILTER.name;
    },
    getAccount_number ({ FILTER }) {
        return FILTER.account_number;
    },
    getBank_id ({ FILTER }) {
        return FILTER.bank_id;
    },
    getDescription ({ FILTER }) {
        return FILTER.description;
    },
    getCurrency_id ({ FILTER }) {
        return FILTER.currency_id;
    },
    getLegal_entity_id ({ FILTER }) {
        return FILTER.legal_entity_id;
    }
};

export default getters;
