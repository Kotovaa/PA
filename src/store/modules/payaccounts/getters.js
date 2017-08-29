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
    getAccountNumberInA24 ({ FILTER }) {
        return FILTER.account_number_in_a24;
    },
    getEndBalance ({ FILTER }) {
        return FILTER.end_balance;
    },
    getLastPayHistoryId ({ FILTER }) {
        return FILTER.last_pay_history_id;
    },
    getAllCompanies ({ COMPANIES }) {
        return COMPANIES;
    },
    getCompanies ({ FILTER }) {
        return FILTER.companies;
    }
};

export default getters;
