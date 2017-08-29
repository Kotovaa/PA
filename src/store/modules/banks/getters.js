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
    getItemStatusName({ ITEM, STATUSES }) {
        let s = STATUSES.find(s => s.id == ITEM.status_id)
        return s ? s.name : ''
    },
    totalItems({ total }) {
        return total
    },
    getStatuses ({ FILTER }) {
        return FILTER.statuses;
    },
    getId ({ FILTER }) {
        return FILTER.id;
    },
    getBank_bic ({ FILTER }) {
        return FILTER.bank_bic;
    },
    getBank_name ({ FILTER }) {
        return FILTER.bank_name;
    },
    getBank_corr_account ({ FILTER }) {
        return FILTER.bank_corr_account;
    },
    getDescription ({ FILTER }) {
        return FILTER.description;
    }
};

export default getters;
