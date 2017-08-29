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
    getDatetime ({ FILTER }) {
        return FILTER.datetime;
    },
    getValue ({ FILTER }) {
        return FILTER.value;
    },
    getDescription ({ FILTER }) {
        return FILTER.description;
    },
    getCurrency_id ({ FILTER }) {
        return FILTER.currency_id;
    },
    getBankAccountId ({ FILTER }) {
        return FILTER.bank_account_id;
    },
    getFromPayAccountId ({ FILTER }) {
        return FILTER.from_pay_account_id;
    },
    getToPayAccountId ({ FILTER }) {
        return FILTER.to_pay_account_id;
    },
    getBlockedFlag ({ FILTER }) {
        return FILTER.blocked_flag;
    },
    getToCheckFlag ({ FILTER }) {
        return FILTER.to_check_flag;
    },
    getTransactionTypeId ({ FILTER }) {
        return FILTER.transaction_type_id;
    },
    getPaymentPurpose ({ FILTER }) {
        return FILTER.payment_purpose;
    },
    getBankDocumentId ({ FILTER }) {
        return FILTER.bank_document_id;
    },
    getA24TariffId ({ FILTER }) {
        return FILTER.a24_tariff_id;
    },
    getFlagInOut ({ FILTER }) {
        return FILTER.flag_in_out;
    },
    getAllTypesOperation({ OPERATIONS }) {
        return OPERATIONS;
    },
    getOperations ({ FILTER }) {
        return FILTER.operations;
    }

};

export default getters;
