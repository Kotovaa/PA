const initialState = {
    ITEMS: [],
    ITEM: {},
    NEW_ITEM: {},
    FILTER: {
    	id: '',
        name: '',
        account_number: '',
        bank_id: '',
        description: '',
        legal_entity_id: '',
        statuses: [],
        currencys: [],
        companies: []
    },
    CURRENCY: [],
    STATUSES: [],
    COMPANIES: [],
    page: 1,
    perPage: 20,
    total: 0,
    last: 1,
};

const state = { ...initialState };

export default state;
