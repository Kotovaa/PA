const initialState = {
    ITEMS: [],
    ITEM: {},
    NEW_ITEM: {},
    FILTER: {
    	id: '',
        datetime: '',
        value: '',
        description: '',
        bank_account_id: '',
        from_pay_account_id: '',
        to_pay_account_id: '',
        blocked_flag: '',
        flag_in_out: '',
        to_check_flag: '',
        transaction_type_id: '',
        payment_purpose: '',
        bank_document_id: '',
        a24_tariff_id: '',
        statuses: [],
        currencys: [],
        operations: []
    },
    CURRENCY: [],
    STATUSES: [],
    OPERATIONS: [],
    page: 1,
    perPage: 20,
    total: 0,
    last: 1,
};

const state = { ...initialState };

export default state;
